export function subParsingInstructions(rows: string[][]): string {
  return `
  **Identity**
  You are an expert at parsing Excel data to JavaScript objects.
  Especially, you are good at identifying complex, structured, or compound information that would benefit from additional parsing into separate fields or objects.


  **Given Data**
  - Rows: ${rows}


  **Instructions**
  - Determine whether this value likely contains **complex, structured, or compound information** that would benefit from additional parsing into separate fields or objects.
  - Consider the following factors:
    - Is the content unusually long or multi-line?
    - Does it include multiple distinct pieces of information? (e.g., product names, durations, notes)
    - Does it contain repeating patterns, dates, units, or structured elements like colons (:) and slashes (/)?


  **Output**
  - If additional parsing (such as splitting into multiple objects or fields) would improve data clarity or structure, return true with the cell index.
  - Example:
    [  
      {
        "rowIndex": 0,
        "columnIndex": 9,
        "value": "(에이블짐 건대입구역점) 1:1 OT 10회 10개월 - 만료 : 2026-02-16 / 10회\\n(에이블짐 건대입구역점) 헬스회원권 12개월 - 만료 : 2026-02-16 / -회"
      }
    ]


  - Otherwise, return false.
  `;
}

export interface SubParsingKeys {
  [key: string]: {
    type: string;
    description?: string;
    enum?: string[];
    format?: string;
  };
}

export function finalInstructions(
  headers: string[],
  rows: string[][],
  subParsingResponse: string,
  subParsingKeys: SubParsingKeys,
): string {
  return `
  **Identity**
  You are an expert at parsing Excel data to JavaScript objects.
  
  **Given Data**
  - Headers: ${headers}
  - Rows: ${rows}
  - SubParsingResponse: ${subParsingResponse}
  - SubParsingKeys: ${subParsingKeys}

  **Instructions**
  - If subParsingResponse is false, do nothing.
  - If subParsingResponse is not false, find the row matching the given information ${subParsingResponse}. 
  - Then, map the keys from ${Object.keys(subParsingKeys)} to that row, and replace the original field with the mapped result.
  - Follow the instructions in the **description** ${subParsingKeys} to map the keys.

  **Output**
  - Convert each row into a JSON object using the headers as keys. JSON object should be safely parsed using JSON.parse()
  - Each value in the row must be mapped to the header at the **same index**.  
  - Only return the JSON array, without code block (no triple backticks), nothing else.

  **Example**
  Headers: ["name", "membership"]
  Rows: [["홍길동", "(에이블짐 건대입구역점) 1:1 PT 10회 10개월 - 만료 : 2026-02-16 / 9회\\n(에이블짐 건대입구역점) 헬스회원권 12개월 - 만료 : 2026-02-16 / -회"]]
  SubParsingResponse: 
    [
      {
        "rowIndex": 0,
        "columnIndex": 1,
        "value": "(에이블짐 건대입구역점) 1:1 PT 10회 10개월 - 만료 : 2026-02-16 / 9회\\n(에이블짐 건대입구역점) 헬스회원권 12개월 - 만료 : 2026-02-16 / -회"
      }
    ]

  SubParsingKeys
    {
      "branch": {
          "type": "string"
      },
      "displayName": {
          "type": "string",
          "description": "1:1 PT"
      },
      "registerType": {
          "type": "string",
          "enum": [
              "duration",
              "count"
          ],
          "description": "if there is no count (e.g. 20회), set to duration, Otherwise, set to count"
      },
      "durationValue": {
          "type": "number"
      },
      "durationUnit": {
          "type": "string",
          "enum": [
              "minute",
              "hour",
              "day",
              "month"
        ]
      },
      "sessionCount": {
          "type": "number",
          "description": "if registerType is duration, set to null"
      },
      "usedSessionCount": {
          "type": "number",
          "description": "if registerType is duration, set to null"
      },
      "expiredAt": {
          "type": "string",
          "format": "date",
          "description": "2025-09-02"
      }
    }

    Expected output:
    [
      {
        "name": "홍길동",
        "membership": [
          {
            "branch": "에이블짐 건대입구역점",
            "displayName": "1:1 PT",
            "sessionCount": 10,
            "usedSessionCount": 9,
            "durationValue": 10,
            "durationUnit": "개월",
            "expiredAt": "2026-02-16"
          },
          {
            "branch": "에이블짐 건대입구역점",
            "displayName": "헬스회원권",
            "sessionCount": null,
            "durationValue": 12,
            "durationUnit": "개월",
            "expiredAt": "2026-02-16"
          },  
        ]
      }
    ]
  `;
}
