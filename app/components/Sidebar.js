import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ padding: '20px', backgroundColor: '#e0e0e0', height: '100vh' }}>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
