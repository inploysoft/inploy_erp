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

export function finalInstructions(
  headers: string[],
  rows: string[][],
  subParsingResponse: string | null,
  subFields: string[] | null,
): string {
  return `
  **Identity**
  You are an expert at parsing Excel data to JavaScript objects.
  
  **Given Data**
  - Headers: ${headers}
  - Rows: ${rows}
  - SubParsingResponse: ${subParsingResponse}
  - SubFields: ${subFields}

  **Instructions**
  - If subFields is not null, and subParsingResponse is not null and not false, find the row with given information ${subParsingResponse}, and map the subFields to the row.
  - If subFields is null, or subParsingResponse is null or false, do nothing.

  ---
  - Convert each row into a JSON object using the headers as keys. JSON object should be safely parsed using JSON.parse()
  - Each value in the row must be mapped to the header at the **same index**.  
  - Only return the JSON array, without code block (no triple backticks), nothing else.


  **Example**
  - Headers:
  ["Name", "Age", "City", "Note"]

  - Rows:
  [
    ["John", "30", "New York", "(에이블짐 건대입구역점) 1:1 OT 10회 10개월 - 만료 : 2026-02-16 / 10회\\n(에이블짐 건대입구역점) 헬스회원권 12개월 - 만료 : 2026-02-16 / -회"],
    ["Jane", "25", "San Francisco", "This is a note"]
  ]

  - SubParsingResponse:
    [  
      {
        "rowIndex": 0,
        "columnIndex": 9,
        "value": "(에이블짐 건대입구역점) 1:1 OT 10회 10개월 - 만료 : 2026-02-16 / 10회\\n(에이블짐 건대입구역점) 헬스회원권 12개월 - 만료 : 2026-02-16 / -회"
      }
    ]

  - SubFields:
    ["branch", "registerType", "displayName", "durationValue", "durationUnit", "sessionCount", "expiredAt"]

  - Expected output:
  [
    { "Name": "John", "Age": "30", "City": "New York", "Note": [{ "branch": "에이블짐 건대입구역점", "registerType": "duration", "displayName": "1:1 OT", "durationValue": 10, "durationUnit": "month", "sessionCount": 10, "expiredAt": "2026-02-16" }, { "branch": "에이블짐 건대입구역점", "registerType": "duration", "displayName": "헬스회원권", "durationValue": 12, "durationUnit": "month", "sessionCount": 12, "expiredAt": "2026-02-16" }] },
    { "Name": "Jane", "Age": "25", "City": "San Francisco", "Note": "This is a note" }
  ]
  `;
}
