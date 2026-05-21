/** Shared Ethiopian insurers and provider names for demo fixtures */

/** Root-absolute paths — must not be locale-prefixed (see middleware logos exclusion). */
export const PAYER_LOGO_PATHS: Record<string, string> = {
	"payer-001": "/logos/nyala.png",
	"payer-002": "/logos/united.png",
	"payer-004": "/logos/awash.png",
	"payer-005": "/logos/oromia.png",
	"payer-006": "/logos/ethio_life.webp",
};

export function getPayerLogoUrl(payerId: string, logoUrl?: string): string | undefined {
	if (logoUrl) return logoUrl;
	return PAYER_LOGO_PATHS[payerId];
}

export const ETHIOPIAN_INSURERS = {
	nyala: {
		id: "payer-001",
		name: "Nyala Insurance",
		payerCode: "NYALA-001",
		email: "claims@nyalainsurance.com.et",
		phone: "+251 11 552 6262",
		region: "Addis Ababa",
		logoUrl: "/logos/nyala.png",
	},
	united: {
		id: "payer-002",
		name: "United Insurance Company of Ethiopia",
		payerCode: "UIC-002",
		email: "info@unitedinsurance.et",
		phone: "+251 11 515 1060",
		region: "Addis Ababa",
		logoUrl: "/logos/united.png",
	},
	eic: {
		id: "payer-003",
		name: "Ethiopian Insurance Corporation",
		payerCode: "EIC-003",
		email: "contact@ethioinsurance.gov.et",
		phone: "+251 11 551 0077",
		region: "Addis Ababa",
	},
	awash: {
		id: "payer-004",
		name: "Awash Insurance",
		payerCode: "AWS-004",
		email: "info@awashinsurance.com",
		phone: "+251 11 662 9888",
		region: "Addis Ababa",
		logoUrl: "/logos/awash.png",
	},
	oromia: {
		id: "payer-005",
		name: "Oromia Insurance",
		payerCode: "ORM-005",
		email: "contact@oromiainsurance.com",
		phone: "+251 11 439 0000",
		region: "Addis Ababa",
		logoUrl: "/logos/oromia.png",
	},
	ethioLife: {
		id: "payer-006",
		name: "Ethio Life and General Insurance",
		payerCode: "ELGI-006",
		email: "info@ethiolifeinsurance.com",
		phone: "+251 11 662 1200",
		region: "Addis Ababa",
		logoUrl: "/logos/ethio_life.webp",
	},
} as const;

export const DEMO_PROVIDERS = {
	yonatan: "Dr. Yonatan Girma",
	selamawit: "Dr. Selamawit Haile",
	abebe: "Dr. Abebe Mekonnen",
	rahel: "Dr. Rahel Desta",
} as const;

export function fullName(first: string, last: string) {
	return `${first} ${last}`;
}
