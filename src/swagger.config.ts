const config = {
    'openapi': '3.0.2',
    'basePath': '/',
    'info': {
        'description': 'server',
        'version': '2.0.0',
        'title': 'Data server',
    },
    'servers': [
        {
            'url': `${process.env.DEPLOY_URL}:${process.env.PORT}/`,
            'description': 'Server',
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
                    '400': {
                        'description': 'Error',
                    },
                },
            },
            'post': {
                'description': 'Create new article',
                'tags': [
                    'Article',
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            'schema': {
                                'type': 'object',
                                '$ref': '#/components/schemas/NewArticle',
                            },
                        },
                    },
                },
                "responses": {
                    "200": {
                        "description": "Article created",
                        'schema': {
                            'type': 'object',
                            '$ref': '#/components/schemas/Article',
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
            'put': {
                'description': 'Replace all properties',
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
                "requestBody": {
                    "content": {
                        "application/json": {
                            'schema': {
                                'type': 'object',
                                '$ref': '#/components/schemas/NewArticle',
                            },
                        },
                    },
                },
                "responses": {
                    "200": {
                        "description": "Article updated",
                        'schema': {
                            'type': 'object',
                            '$ref': '#/components/schemas/Article',
                        },
                    },
                },
            },
            'patch': {
                'description': 'Partial replacement of properties',
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
                "requestBody": {
                    "content": {
                        "application/json": {
                            'schema': {
                                'type': 'object',
                                '$ref': '#/components/schemas/NewArticle',
                            },
                        },
                    },
                },
                "responses": {
                    "200": {
                        "description": "Article updated",
                        'schema': {
                            'type': 'object',
                            '$ref': '#/components/schemas/Article',
                        },
                    },
                },
            },
            'delete': {
                'description': 'Delete an article',
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
                "responses": {
                    "200": {
                        "description": "Article deleted",
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
            'NewArticle': {
                'properties': {
                    'subject': {
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
