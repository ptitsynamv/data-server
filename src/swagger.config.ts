const config = {
    'openapi': '3.0.2',
    'basePath': '/',
    'info': {
        'description': '',
        'version': '1.0.0',
        'title': 'Antropogenez data server',
    },
    'servers': [
        {
            'url': 'http://localhost:3000/',
            'description': 'Local',
        },
    ],
    'paths': {
        '/api/article': {
            'get': {
                'description': 'Get all articles list',
                'tags': [
                    'Article',
                ],
                'parameters': [
                    {
                        'name': 'limit',
                        'in': 'query',
                        'description': 'limit of articles',
                        'required': false,
                        'schema': {
                            'type': 'integer',
                        },
                    },
                    {
                        'name': 'offset',
                        'in': 'query',
                        'description': 'offset of articles',
                        'required': false,
                        'schema': {
                            'type': 'integer',
                        },
                    },
                ],
                'responses': {
                    '200': {
                        'description': 'get all',
                        'schema': {
                            'type': 'object',
                            '$ref': '#/components/schemas/ArticleList',
                        },
                    },
                },
            },
        },
        '/api/article/{id}': {
            'get': {
                'description': 'Get article by id',
                'tags': [
                    'Article',
                ],
                'parameters': [
                    {
                        'name': 'id',
                        'in': 'path',
                        'description': 'id of article object',
                        'required': true,
                        'schema': {
                            'type': 'string',
                        },
                    },
                ],
                'responses': {
                    '200': {
                        'description': 'article by id',
                        'schema': {
                            'type': 'object',
                            '$ref': '#/components/schemas/ArticleList',
                        },
                    },
                },
            },
        },
    },
    'components': {
        'parameters': {
            'email': {
                'name': 'email',
                'description': 'Email',
                'in': 'formData',
                'required': 'true',
                'type': 'string',
            },
            'password': {
                'name': 'password',
                'description': 'Password',
                'in': 'formData',
                'required': 'true',
                'type': 'string',
            },
            'limit': {
                'name': 'limit',
                'description': 'Limit',
                'in': 'query',
                'required': 'false',
                'type': 'integer',
            },
            'offset': {
                'name': 'offset',
                'description': 'Offset',
                'in': 'query',
                'required': 'false',
                'type': 'integer',
            },
            'id': {
                'name': 'id',
                'description': 'Article Id',
                'in': 'path',
                'required': 'true',
                'type': 'string',
            },
        },
        'schemas': {
            'ArticleList': {
                'required': [
                    'list',
                    'count',
                ],
                'properties': {
                    'count': {
                        'type': 'integer',
                    },
                    'list': {
                        'type': 'array',
                    },
                    'items': {
                        '$ref': '#/components/schemas/Article',
                    },
                },
            },
            'Article': {
                'required': [
                    '_id',
                    'subject',
                ],
                'properties': {
                    '_id': {
                        'type': 'string',
                    },
                    'subject': {
                        'type': 'string',
                    },
                    'date': {
                        'type': 'string',
                    },
                    'text': {
                        'type': 'string',
                    },
                },
            },
            'ErrorResponse': {
                'required': [
                    'status',
                    'message',
                ],
                'properties': {
                    'status': {
                        'type': 'number',
                    },
                    'message': {
                        'type': 'string',
                    },
                },
            },
        },
        'responses': {},
        'securitySchemes': {
            'oAuth2': {
                'type': 'oauth2',
                'flows': {
                    'implicit': {
                        'authorizationUrl': `${process.env.OAUTH_SERVER_URL}oauth2/authorize`,
                        'scopes': {
                            'api': 'API Scope',
                        },
                    },
                },
            },
        },
    },
    'security': [
        {
            'oAuth2': [
                'api',
            ],
        },
    ],
};

export default config;
