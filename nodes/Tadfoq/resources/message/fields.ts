import { NodeOperationError } from 'n8n-workflow';
import type {
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

// Guards the Tadfoq API rule that a button message must carry 1–3 buttons.
async function validateButtons(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOptions.body as { buttons?: unknown[] } | undefined;
	const buttons = Array.isArray(body?.buttons) ? body.buttons : [];

	if (buttons.length < 1 || buttons.length > 3) {
		throw new NodeOperationError(
			this.getNode(),
			'Button messages require 1–3 buttons',
			{ description: `You provided ${buttons.length}. Add between 1 and 3 buttons.` },
		);
	}

	return requestOptions;
}

// ── Common fields (shown for all message operations) ────────────────────

const showOnlyForAllMessages = {
	resource: ['message'],
	operation: ['sendText', 'sendButton', 'sendList', 'sendTemplate'],
};

const commonMessageFields: INodeProperties[] = [
	{
		displayName: 'Store ID',
		name: 'storeId',
		type: 'hidden',
		default: '7ebf0309-6c0b-476d-8af3-607eddd14663',
		description: 'The merchant-owned store for the conversation',
		displayOptions: { show: showOnlyForAllMessages },
		routing: {
			send: { type: 'body', property: 'store_id' },
		},
	},
	{
		displayName: 'Number Name or ID',
		name: 'numberId',
		type: 'options',
		required: true,
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getWhatsAppNumbers',
		},
		displayOptions: { show: showOnlyForAllMessages },
		routing: {
			send: { type: 'body', property: 'number_id' },
		},
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+201001234567',
		description: 'Recipient phone number in international format',
		displayOptions: { show: showOnlyForAllMessages },
		routing: {
			send: { type: 'body', property: 'to' },
		},
	},
];

// ── Send Text fields ────────────────────────────────────────────────────

const showOnlyForSendText = { resource: ['message'], operation: ['sendText'] };

const sendTextFields: INodeProperties[] = [
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		typeOptions: { rows: 3 },
		description: 'The text message content',
		displayOptions: { show: showOnlyForSendText },
		routing: {
			send: { type: 'body', property: 'content' },
		},
	},
];

// ── Send Button fields ──────────────────────────────────────────────────

const showOnlyForSendButton = { resource: ['message'], operation: ['sendButton'] };

const sendButtonFields: INodeProperties[] = [
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		typeOptions: { rows: 3 },
		description: 'The message body text',
		displayOptions: { show: showOnlyForSendButton },
		routing: {
			send: { type: 'body', property: 'content' },
		},
	},
	{
		displayName: 'Buttons',
		name: 'buttons',
		type: 'fixedCollection',
		required: true,
		default: {},
		placeholder: 'Add Button',
		typeOptions: { multipleValues: true, maxValue: 3, sortable: true },
		description: 'Between 1 and 3 quick-reply buttons',
		displayOptions: { show: showOnlyForSendButton },
		options: [
			{
				displayName: 'Button',
				name: 'values',
				values: [
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						required: true,
						default: '',
						description: 'Button title (max 20 characters)',
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'Optional button identifier',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'buttons',
				value: '={{$value.values}}',
				preSend: [validateButtons],
			},
		},
	},
];

// ── Send List fields ────────────────────────────────────────────────────

const showOnlyForSendList = { resource: ['message'], operation: ['sendList'] };

const sendListFields: INodeProperties[] = [
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		typeOptions: { rows: 3 },
		description: 'The message body text',
		displayOptions: { show: showOnlyForSendList },
		routing: {
			send: { type: 'body', property: 'content' },
		},
	},
	{
		displayName: 'Button Text',
		name: 'listButtonText',
		type: 'string',
		required: true,
		default: '',
		description: 'Text for the list menu button (max 20 characters)',
		displayOptions: { show: showOnlyForSendList },
		routing: {
			send: { type: 'body', property: 'list.button_text' },
		},
	},
	{
		displayName: 'Rows',
		name: 'listRows',
		type: 'fixedCollection',
		required: true,
		default: {},
		placeholder: 'Add Row',
		typeOptions: { multipleValues: true, maxValue: 10 },
		description: 'List rows (1-10 items)',
		displayOptions: { show: showOnlyForSendList },
		options: [
			{
				displayName: 'Row',
				name: 'values',
				values: [
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						required: true,
						default: '',
						description: 'Row title (max 24 characters)',
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'Optional row identifier',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Optional row description (max 72 characters)',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'list.rows',
				value: '={{$value.values}}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForSendList },
		options: [
			{
				displayName: 'Section Title',
				name: 'listSectionTitle',
				type: 'string',
				default: '',
				description: 'Title for the list section (max 24 characters)',
				routing: {
					send: { type: 'body', property: 'list.section_title' },
				},
			},
			{
				displayName: 'Footer',
				name: 'listFooter',
				type: 'string',
				default: '',
				description: 'Footer text below the list (max 60 characters)',
				routing: {
					send: { type: 'body', property: 'list.footer' },
				},
			},
		],
	},
];

// ── Send Template fields ────────────────────────────────────────────────

const showOnlyForSendTemplate = { resource: ['message'], operation: ['sendTemplate'] };

const sendTemplateFields: INodeProperties[] = [
	{
		displayName: 'Template Name or ID',
		name: 'templateName',
		type: 'options',
		required: true,
		default: '',
		description: 'The template must be approved for the selected number. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getTemplates',
			loadOptionsDependsOn: ['numberId'],
		},
		displayOptions: { show: showOnlyForSendTemplate },
		routing: {
			send: { type: 'body', property: 'template_name' },
		},
	},
	{
		displayName: 'Language Code',
		name: 'languageCode',
		type: 'string',
		required: true,
		default: 'en_US',
		placeholder: 'e.g. en_US',
		description: 'Template language code',
		displayOptions: { show: showOnlyForSendTemplate },
		routing: {
			send: { type: 'body', property: 'language_code' },
		},
	},
	{
		displayName: 'Variable Values',
		name: 'variableValues',
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Variable',
		typeOptions: { multipleValues: true },
		description: 'Template variables in the exact order declared by Meta',
		displayOptions: { show: showOnlyForSendTemplate },
		options: [
			{
				displayName: 'Variable',
				name: 'values',
				values: [
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						required: true,
						default: '',
						description: 'Variable value',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'variable_values',
				value: '={{$value.values.map(v => v.value)}}',
			},
		},
	},
];

// ── Export ───────────────────────────────────────────────────────────────

export const messageFields: INodeProperties[] = [
	...commonMessageFields,
	...sendTextFields,
	...sendButtonFields,
	...sendListFields,
	...sendTemplateFields,
];
