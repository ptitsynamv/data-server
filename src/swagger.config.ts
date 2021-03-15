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
        '/api/public-service-water': {
            'get': {
                'description': 'Get all public service water list',
                'tags': [
                    'PublicServiceWater',
                ],
                'parameters': [
                    {
                        'name': 'limit',
                        'in': 'query',
                        'description': 'limit',
                        'required': false,
                        'schema': {
                            'type': 'integer',
                        },
                    },
                    {
                        'name': 'offset',
                        'in': 'query',
                        'description': 'offset',
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
                            '$ref': '#/components/schemas/PublicServiceWater',
                        },
                    },
                    '400': {
                        'description': 'Error',
                    },
                },
            },
            'post': {
                'description': 'Create new PublicServiceWater',
                'tags': [
                    'PublicServiceWater',
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            'schema': {
                                'type': 'object',
                                '$ref': '#/components/schemas/NewPublicServiceWater',
                            },
                        },
                    },
                },
                "responses": {
                    "200": {
                        "description": "PublicServiceWater created",
                        'schema': {
                            'type': 'object',
                            '$ref': '#/components/schemas/PublicServiceWater',
                        },
                    },
                },
            },
        },
        '/api/public-service-water/{id}': {
            'get': {
                'description': 'Get PublicServiceWater by id',
                'tags': [
                    'PublicServiceWater',
                ],
                'parameters': [
                    {
                        'name': 'id',
                        'in': 'path',
                        'description': 'id',
                        'required': true,
                        'schema': {
                            'type': 'string',
                        },
                    },
                ],
                'responses': {
                    '200': {
                        'description': 'PublicServiceWater by id',
                        'schema': {
                            'type': 'object',
                            '$ref': '#/components/schemas/PublicServiceWater',
                        },
                    },
                },
            },
            'delete': {
                'description': 'Delete PublicServiceWater',
                'tags': [
                    'PublicServiceWater',
                ],
                'parameters': [
                    {
                        'name': 'id',
                        'in': 'path',
                        'description': 'id of PublicServiceWater object',
                        'required': true,
                        'schema': {
                            'type': 'string',
                        },
                    },
                ],
                "responses": {
                    "200": {
                        "description": "PublicServiceWater deleted",
                    },
                },
            },
        }
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
            'PublicServiceWater': {
                'required': [
                    'data',
                ],
                'properties': {
                    'id': {
                        'type': 'string',
                    },
                    'data': {
                        'type': 'string',
                    },
                    'date': {
                        'type': 'string',
                    },
                },
            },
            'NewPublicServiceWater': {
                'required': [
                    'data',
                ],
                'properties': {
                    'data': {
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
