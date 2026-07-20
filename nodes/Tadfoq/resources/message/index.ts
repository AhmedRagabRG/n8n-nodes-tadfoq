import type { INodeProperties } from 'n8n-workflow';
import { messageOperations } from './operations';
import { messageFields } from './fields';

export const messageDescription: INodeProperties[] = [
	...messageOperations,
	...messageFields,
];
