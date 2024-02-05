import Block, { PropsType, RefType } from '../core/Block'

export function render(
	query: string,
	block: Block<PropsType, RefType, HTMLElement>
) {
	const root = document.querySelector(query)!
	root.innerHTML = ''
	root.appendChild(block.getContent())
	block.dispatchComponentDidMount()
	return root
}
