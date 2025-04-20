import { ResponseTextConfig } from 'openai/resources/responses/responses.mjs';

export function generateInstructions(fields: string[]): string {
  return `
  You are an expert at structured data extraction. 
  Convert the unstructured data ${fields} into the given structure.
  

  **Example**

  fields:
  [
    "(에이블짐 건대입구역점) 1:1 OT 10회 10개월 - 만료 : 2026-02-16 / 8회\n(에이블짐 건대입구역점) 헬스회원권 12개월 - 만료 : 2026-02-16 / -회"
  ]

  expected Output**
  [
    {
      "branch": "에이블짐 건대입구역점",
      "displayName": "1:1 OT",
      "registerType": "count",
      "sessionCount": 10,
      "usedSessionCount": 8,
      "durationValue": 10,
      "durationUnit": "month",
      "expiredAt": "2026-02-16"
    },
    {
      "branch": "에이블짐 건대입구역점",
      "displayName": "헬스회원권",
      "registerType": "duration",
      "sessionCount": null,
      "usedSessionCount": null,
      "durationValue": 12,
      "durationUnit": "month",
      "expiredAt": "2026-02-16"
    },  
  ]
  `;
}

export function structuredText(): ResponseTextConfig {
  return {
    format: {
      type: 'json_schema',
      name: 'memberships',
      schema: {
        type: 'object',
        properties: {
          memberships: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                branch: {
                  type: 'string',
                },
                registerType: {
                  type: 'string',
                  enum: ['duration', 'count'],
                  description:
                    'Set to duration if there is no count (e.g. 20회) in the input. Otherwise, set to count',
                },
                displayName: {
                  type: 'string',
                },
                sessionCount: {
                  type: 'number',
                  description:
                    'Set the value if a count (e.g. "20회") is explicitly present. Otherwise, set to null',
                },
                usedSessionCount: {
                  type: 'number',
                  description:
                    'Set the value if a count (e.g. "20회") is explicitly present. Otherwise, set to null',
                },
                durationValue: {
                  type: 'number',
                },
                durationUnit: {
                  type: 'string',
                  enum: ['minute', 'hour', 'day', 'month'],
                  description:
                    ' "분" -> minute, "시간" -> hour, "일" -> day, "개월" -> month',
                },
                expiredAt: {
                  type: 'string',
                  description: 'YYYY-mm-dd',
                },
              },
              required: [
                'branch',
                'registerType',
                'displayName',
                'sessionCount',
                'usedSessionCount',
                'durationValue',
                'durationUnit',
                'expiredAt',
              ],
              additionalProperties: false,
            },
          },
        },
        required: ['memberships'],
        additionalProperties: false,
      },
      strict: true,
    },
  };
}
