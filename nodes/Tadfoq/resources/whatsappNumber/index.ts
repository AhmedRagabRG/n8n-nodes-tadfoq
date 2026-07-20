import type { INodeProperties } from 'n8n-workflow';
import { whatsappNumberOperations } from './operations';
import { whatsappNumberFields } from './fields';

export const whatsappNumberDescription: INodeProperties[] = [
	...whatsappNumberOperations,
	...whatsappNumberFields,
];
