import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMessage = { resource: ['message'] };

export const messageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForMessage },
		options: [
			{
				name: 'Send Button',
				value: 'sendButton',
				description: 'Send a button message',
				action: 'Send a button message',
				routing: {
					request: {
						method: 'POST',
						url: '/api/merchant/whatsapp/messages',
					},
					send: {
						type: 'body',
						property: 'type',
						value: 'button',
					},
				},
			},
			{
				name: 'Send List',
				value: 'sendList',
				description: 'Send a list message',
				action: 'Send a list message',
				routing: {
					request: {
						method: 'POST',
						url: '/api/merchant/whatsapp/messages',
					},
					send: {
						type: 'body',
						property: 'type',
						value: 'list',
					},
				},
			},
			{
				name: 'Send Template',
				value: 'sendTemplate',
				description: 'Send an approved template message',
				action: 'Send a template message',
				routing: {
					request: {
						method: 'POST',
						url: '/api/merchant/whatsapp/messages',
					},
					send: {
						type: 'body',
						property: 'type',
						value: 'template',
					},
				},
			},
			{
				name: 'Send Text',
				value: 'sendText',
				description: 'Send a text message',
				action: 'Send a text message',
				routing: {
					request: {
						method: 'POST',
						url: '/api/merchant/whatsapp/messages',
					},
					send: {
						type: 'body',
						property: 'type',
						value: 'text',
					},
				},
			},
		],
		default: 'sendText',
	},
];
