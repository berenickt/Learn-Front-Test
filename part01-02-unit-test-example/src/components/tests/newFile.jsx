import { screen } from '@testing-library/react'
import React from 'react'
import TextField from '@/components/TextField'
import render from '@/utils/test/render'

/*** describe()
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
  /*** it()
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
     */
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
