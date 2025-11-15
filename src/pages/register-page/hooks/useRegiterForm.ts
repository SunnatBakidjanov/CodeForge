/* --- Imports --- */
import type { FormValues } from '../page-config/form.config';
import { useApiForm } from '../../../hooks/useApiForm';
import { registerUrl } from '../../../utils/urls';
import type { FieldErrors } from 'react-hook-form';

/* --- useRegisterForm Hook --- */
// This hook is used to manage the form for the register page.
export const useRegisterForm = () => {
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues>({
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
		errorsMessage: { success: { message: 'Crafting complete.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		customErrors: {
			409: { type: 'error', message: 'Email already branded in the Forge.' },
		},
		apiHref: registerUrl,
	});

	const onInvalid = (errors: FieldErrors<FormValues>) => {
		const errorHandlers = {
			required: () => setResMessage({ type: 'error', message: 'Every field fuels the Forge.' }),
			notMatchPass: () => setResMessage({ type: 'error', message: 'Passkeys forged differently.' }),
			nameLatnValid: () => setResMessage({ type: 'error', message: 'Only Latin runes allowed.' }),
			passMinLength: () => setResMessage({ type: 'error', message: `Your key needs more strength — 4+ chars.` }),
		};

		for (const err of Object.values(errors)) {
			const key = err?.message || err?.type;
			const handler = err?.type && errorHandlers[key as keyof typeof errorHandlers];

			if (handler) {
				handler();
				return;
			}
		}
	};

	return { onInvalid, handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage };
};
