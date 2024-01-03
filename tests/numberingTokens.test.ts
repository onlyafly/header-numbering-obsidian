import { makeNumberingString, NumberingToken, startAtOrZerothInStyle } from '../src/numberingTokens'

describe('makeNumberingString', () => {
  test('basic', () => {
    const stack: NumberingToken[] = [
      { style: '1', value: 1 },
      { style: '1', value: 1 }
    ]
    const result = makeNumberingString(stack,'')
    expect(result).toBe(' 1.1')
  })
  test('basic', () => {
    const stack: NumberingToken[] = [
      { style: 'A', value: 'A' },
      { style: 'A', value: 'B' },
      { style: '1', value: 1 }
    ]
    const result = makeNumberingString(stack,'')
    expect(result).toBe(' A.B.1')
  })
  test('roman unmixed', () => {
    const stack: NumberingToken[] = [
      { style: 'I', value: 'V' },
      { style: 'I', value: 'X' },
      { style: 'I', value: 'XXI' }
    ]
    const result = makeNumberingString(stack,'')
    expect(result).toBe(' V.X.XXI')
  })
  test('roman mixed', () => {
    const stack: NumberingToken[] = [
      { style: 'I', value: 'V' },
      { style: 'A', value: 'C' },
      { style: '1', value: 123 }
    ]
    const result = makeNumberingString(stack,'')
    expect(result).toBe(' V.C.123')
  })
})

describe('startAtOrZerothInStyle', () => {
  test('empty letter', () => {
    const result = startAtOrZerothInStyle('', 'A')
    expect(result).toStrictEqual({ style: 'A', value: 'Z' })
  })
  test('empty number', () => {
    const result = startAtOrZerothInStyle('', '1')
    expect(result).toStrictEqual({ style: '1', value: 0 })
  })
  test('letters', () => {
    const result = startAtOrZerothInStyle('C', 'A')
    expect(result).toStrictEqual({ style: 'A', value: 'B' })
  })
  test('numbers', () => {
    const result = startAtOrZerothInStyle('3', '1')
    expect(result).toStrictEqual({ style: '1', value: 2 })
  })
  test('mismatched', () => {
    const result = startAtOrZerothInStyle('3', 'A')
    expect(result).toStrictEqual({ style: 'A', value: 'Z' })
  })
  test('roman', () => {
    const result = startAtOrZerothInStyle('V', 'I')
    expect(result).toStrictEqual({ style: 'I', value: 'IV' })
  })
  test('roman from zero', () => {
    const result = startAtOrZerothInStyle('I', 'I')
    expect(result).toStrictEqual({ style: 'I', value: '0' })
  })
})
