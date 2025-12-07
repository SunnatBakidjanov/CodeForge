import type { PageConfigType } from '@/UI/legal/Legal';

export const pageConfig = {
	hideTitle: 'CodeForge Private Policy',
	title: 'Privacy Policy — ',
	lastUpdated: 'Last Updated: November 20, 2025',
	dataPoints: [
		{
			title: 'General Information',
			text: [
				'This **Privacy Policy** explains what data **CodeForge** collects, how it is used, and how it is protected.',
				'By using **CodeForge,** you agree to the terms of this **Policy.**',
			],
		},
		{
			title: 'Data We Collect',
			text: [
				'/count**Account Data**',
				'',
				'When creating an account, the **Service** collects:',
				'[*username provided by the user, *email address, *password (stored only in encrypted/hashed form), *unique user ID.]',
				'/count**Technical Data**',
				'',
				'The **Service** may automatically collect:',
				'[*information about the browser, device, and operating system, *IP address, *error logs and security-related technical data.]',
				'These data are used only to ensure security and proper functioning of the **Service.**',
			],
		},
		{
			title: 'How We Use Data',
			text: [
				'Collected data are used for:',
				'[*creating and managing user accounts, *authentication and providing access to the Service, *protecting the platform from abuse, *improving stability and performance.]',
				'We do not sell, rent, or share personal data with third parties.',
			],
		},
		{
			title: 'Data Storage and Security',
			text: [
				'[*Passwords are stored only in encrypted (hashed) form. *Data transmission uses HTTPS secure connection. *Access to data is restricted to the owner of the Service and used only for technical maintenance.]',
			],
		},
		{
			title: 'Cookies and Similar Technologies',
			text: [
				'**CodeForge** may use cookies for:',
				'[*user authentication, *basic technical settings, *preventing repeated requests (rate limiting).]',
				'Cookies are not used for tracking and are not shared with third parties.',
			],
		},
		{
			title: 'Data Deletion',
			text: [
				'**Users** can permanently delete their account and personal data in their profile settings.',
				'After deletion, the data cannot be restored.',
			],
		},
		{
			title: 'Sharing Data with Third Parties',
			text: [
				'We do not share personal data with other users, companies, or advertising services.',
				'Exceptions may apply only if required by law.',
			],
		},
		{
			title: 'Changes to the Policy',
			text: [
				'This **Privacy Policy** may be updated. Continued use of the **Service** after updates means acceptance of the revised **Policy.**',
			],
		},
		{
			title: 'For questions or suggestions related to the Service, please contact:',
			text: ['**Email: **[email]'],
		},
	],
} as PageConfigType;
