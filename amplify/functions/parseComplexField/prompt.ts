import { ResponseTextConfig } from 'openai/resources/responses/responses.mjs';

export function generateInstructions(): string {
  return `
  Your job is to extract and structure each membership description as a JSON object.

  **Input Data**
  - Input data is a string array. Each block in the array may contain multiple membership descriptions.
  - Descriptions within a block are separated by newline characters.

  **Expected Output**
  - The output must be an array of arrays.
  - The number of output arrays must exactly match the number of input blocks.
  - The number of objects in each output array must exactly match the number of lines in the corresponding input block.

  **Example**
  - Given Data:
  [
    "(에이블짐 건대입구역점) 1:1 OT 10회 10개월 만료 : 2026-02-16 8회\n(에이블짐 건대입구역점) 헬스회원권 12개월 만료 : 2026-02-16 회",
    "(에이블짐 건대입구역점) 헬스회원권 311일 만료 : 2025-05-01 회"
  ]

  - Output:
  {
    "memberships": [
      [
        {
          "branch": "에이블짐 건대입구역점",
          "displayName": "1:1 OT",
          ...
        },
        {
          "branch": "에이블짐 건대입구역점",
          "displayName": "헬스회원권",
          ...
        }
      ],
      [
        {
          "branch": "에이블짐 건대입구역점",
          "displayName": "헬스회원권",
          ...
        }
      ]
    ]
  }
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
                      'Set the value if a count (e.g. "20회") is explicitly present. Otherwise, set to 0',
                  },
                  usedSessionCount: {
                    type: 'number',
                    description:
                      'Set the value if a count (e.g. "20회") is explicitly present. Otherwise, set to 0',
                  },
                  durationValue: {
                    type: 'number',
                  },
                  durationUnit: {
                    type: 'string',
                    enum: ['none', 'minute', 'hour', 'day', 'month'],
                    description:
                      '"분" -> minute, "시간" -> hour, "일" -> day, "개월" -> month. If none of these units are present, set to none',
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
        },
        required: ['memberships'],
        additionalProperties: false,
      },
      strict: true,
    },
  };
}
