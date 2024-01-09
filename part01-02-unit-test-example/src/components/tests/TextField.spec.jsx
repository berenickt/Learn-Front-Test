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
  // render API 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM : Node.js에서 사용하기 위해 많은 웹 표준을 순수 JS로 구현
  // await을 사용하여 렌더링이 완료될 때까지 기다림
  await render(<TextField className="my-class" />)

  // screen 객체를 사용하여 특정 텍스트 필드를 찾음
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

  // vitest의 expect()를 사용해 기대 결과를 검증
  // 특정 엘리먼트가 특정 클래스를 가지고 있는지 확인
  expect(textInput).toHaveClass('my-class')
})

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />)

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

    expect(textInput).toBeInTheDocument()
  })

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />)

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.')

    expect(textInput).toBeInTheDocument()
  })
})

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn()

  const { user } = await render(<TextField onChange={spy} />)

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

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

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn()
  const { user } = await render(<TextField onFocus={spy} />)

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

  await user.click(textInput)

  expect(spy).toHaveBeenCalled()
})

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />)

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.')

  await user.click(textInput)

  expect(textInput).toHaveStyle({
    borderWidth: '2px',
    borderColor: 'rgb(25, 118, 210)',
  })
})
