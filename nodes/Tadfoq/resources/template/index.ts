import type { INodeProperties } from 'n8n-workflow';
import { templateOperations } from './operations';
import { templateFields } from './fields';

export const templateDescription: INodeProperties[] = [
	...templateOperations,
	...templateFields,
];
