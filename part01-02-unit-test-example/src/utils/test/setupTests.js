import '@testing-library/jest-dom'

/*** Library Jest DOM을 추가하여 매처를 확장
 * toBeInTheDocument
 * toHaveClass, ...
 */

// 모킹한 모듈의 히스토리를 초기화
afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks()
})

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
