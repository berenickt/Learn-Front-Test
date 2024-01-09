import { screen } from '@testing-library/react'
import React from 'react'

import TextField from '@/components/TextField'
import render from '@/utils/test/render'

/***
 * 1. `Arrange` : 테스트를 위한 환경 만들기 (컴포넌트 렌더링)
 *    -> className을 지닌 컴포넌트 렌더링
 * 2. `Act` : 테스트할 동작 발생 (클릭, 타이핑, 메서드 호출)
 *    -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
 *    -> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
 * 3. `Assert` : 올바른 동작이 실행 되었는지 또는 변경사항 검증하기
 *    -> 렌더링 후 DOM에 해당 class가 존재하는지 검증
 */
it('className prop으로 설정한 css class가 적용된다.', async () => {
  await render(<TextField className="my-class" />)

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

  expect(textInput).toHaveClass('my-class')
})

/*** 📌 describe()
 * 테스트를 그리핑해서 새로운 블럭(즉, 컨텍스트)를 만드는 역할
 * 기본적으로 it 함수로 정의된 테스트 파일은 루트이기 때문에 최상의 컨텍스트로 테스트 코드가 실행된다.
 *
 * 하지만 describe를 사용하면 원하는 테스트들을 묶어서 최상위가 아니라
 * 독립된 컨텍스트를 만들어 그룹핑 할 수가 있다
 *
 * describe 함수를 사용해서 그룹핑하게 되면,
 * 테스트 코드를 좀 더 명확하게 구분할 수 있고,
 * 그룹별로 테스트 실행에 필요한 설정들도 독립적으로 분리해서 정의할 수 있다
 */
describe('placeholder', () => {
  /*** 📌 it()
   * 기대결과 === 실제 결과 -> 성공
   * 기대결과 !== 실제 결과 -> 실패
   *
   * it()함수는 test()의 alias다.
   * 기능상의 차이는 없고, 영어로 작성시 가독성 차이로 읽기 편하라고 별명지은 것이다.
   * it('shoud ~~~')
   * test('if~~~~~')
   */
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    /**** 컴포넌트 렌더링을 위해서는 render 함수를 호출
     * React 테스팅 라이브러리의 render 함수의 결과물로
     * 렌더링된 React 컴포넌트의 DOM 구조가 JS DOM에 반영되는 것입니다.
     * jsDOM : Node.js에서 사용하기 위해 많은 웹 표준을 순수 JS로 구현
     */
    await render(<TextField />)

    // screen 객체를 사용하여 특정 텍스트 필드를 찾음
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

    /**** vitest의 expect()를 사용해 기대 결과를 검증
     * 특정 엘리먼트가 특정 클래스를 가지고 있는지 확인
     */
    expect(textInput).toBeInTheDocument()
  })

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />)

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.')

    // **** toBeInTheDocument 매처 : DOM에 있는지 없는지를 검증 가능
    expect(textInput).toBeInTheDocument()
    // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행
  })
})

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  /*** 스파이 함수
   * 테스트 코드에서 특정 함수가 호출되었는지,
   * 함수의 인자로 어ㄸ너 것이 넘어왔는지 반환하는지 등 다양한 값들을 저장
   */
  const spy = vi.fn()

  const { user } = await render(<TextField onChange={spy} />)

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

  // type()는 내부적으로 킷다운 이벤트를 발생시키는데,
  // 이러한 이벤트 시뮬레이션을 기반으로 실제 텍스트를 입력하는 것과 거의 동일하게 테스트 코드를 작성 가능
  await user.type(textInput, 'test')

  expect(spy).toHaveBeenCalledWith('test')
})

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn()

  const { user } = await render(<TextField onEnter={spy} />)

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

  await user.type(textInput, 'test{Enter}')

  expect(spy).toHaveBeenCalledWith('test')
})

/*** 포커스가 활성화될 떄
 * 탭 키로 인풋 요소로 포커스 이동
 * 인풋 요소를 클릭했을 떄
 * textInput.focus()로 직접 발생
 */
it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn()
  const { user } = await render(<TextField onFocus={spy} />)

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

  // click과 연관 -> 포커스, 마우스다운, 마우스업 등...
  await user.click(textInput)

  expect(spy).toHaveBeenCalled()
})

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />)

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

  await user.click(textInput)

  /*** toHaveStyle
   * 스타일 매처를 사용하여 포커스가 활성화되었을 때, 지정한 border 스타일이 올바르게 적용됐는지 검증
   */
  expect(textInput).toHaveStyle({
    borderWidth: '2px',
    borderColor: 'rgb(25, 118, 210)',
  })
})
