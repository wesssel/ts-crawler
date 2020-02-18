export const itemProp = (item: any, prop: string): string => {
  let string = item

  prop.split('.').forEach((value) => {
    string = string[value]
  })

  return string
}

export function delay(time: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
