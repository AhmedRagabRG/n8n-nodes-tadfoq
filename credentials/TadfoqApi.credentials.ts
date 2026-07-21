import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TadfoqApi implements ICredentialType {
	name = 'tadfoqApi';

	displayName = 'Tadfoq API';

	icon: Icon = {
		light: 'file:../icons/logo.svg',
		dark: 'file:../icons/logo.dark.svg',
	};

	documentationUrl = 'https://merchant.tadfoq.com/api/merchant/reference';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			placeholder: 'tdf_live_...',
			description:
				'Create a key in Settings → API Access. The complete secret is shown only once.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://merchant.tadfoq.com',
			url: '/api/merchant/whatsapp/numbers',
			method: 'GET',
		},
	};
}
