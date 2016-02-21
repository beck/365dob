#!/usr/bin/env python
import os
import json
from urlparse import urlparse
from collections import defaultdict

import cson
from instagram.client import InstagramAPI
from instagram.oauth2 import OAuth2Request
from slugify import slugify


class Cache(object):

    @classmethod
    def url_to_fn(cls, url):
        slug = slugify(urlparse(url).path)
        fn = slug.replace('-json', '.json')
        return os.path.join('cache', fn)

    @classmethod
    def get(cls, url):
        fn = cls.url_to_fn(url)
        if not os.path.isfile(fn):
            return None
        with open(fn) as f:
            return json.loads(f.read())

    @classmethod
    def set(cls, url, data):
        fn = cls.url_to_fn(url)
        serialized = json.dumps(data)
        with open(fn, 'w') as f:
            f.write(serialized)


class API(object):

    @classmethod
    def use_cache(cls):
        def cached_make_request(self, url, **kwargs):
            cached = Cache.get(url)
            if cached:
                return cached
            resp = self.make_request_no_cache(url, **kwargs)
            Cache.set(url, resp)
            return resp
        OAuth2Request.make_request_no_cache = OAuth2Request.make_request
        OAuth2Request.make_request = cached_make_request

    @classmethod
    def get(cls):
        cls.use_cache()
        with open('api.config.cson') as f:
            config = cson.loads(f.read())
        return InstagramAPI(**config)


class Media(object):

    @classmethod
    def dic_pic(cls, pic):
        return {
            'url': pic.url,
            'height': pic.height,
            'width': pic.width,
        }

    @classmethod
    def to_dict(cls, media):
        return {
            'author': media.user.username,
            'id': media.id,
            'link': media.link,
            'image': {k: cls.dic_pic(i) for k, i in media.images.items()},
        }


class Calendar(object):

    def __init__(self):
        self.days = defaultdict(list)

    def add(self, media, tag):
        self.days[tag].append(Media.to_dict(media))

    def to_str(self):
        return json.dumps(self.days, indent=2, sort_keys=True)

    @classmethod
    def update(cls):

        api = API.get()
        recent_media, next_ = api.tag_recent_media(
            tag_name='365dob', count=50)
        calendar = cls()

        if next_:
            print "There are more images not being consumed"

        for media in recent_media:
            for tag in media.tags:
                if tag.name.startswith('day'):
                    calendar.add(media, tag.name)

        with open('calendar.json', 'w') as f:
            f.write(calendar.to_str())


if __name__ == '__main__':
    Calendar.update()
