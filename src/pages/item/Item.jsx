import { useState } from 'preact/hooks';

export function Item() {
	const [count, setCount] = useState(0);

	return (
        <div>item</div>
	);
}
