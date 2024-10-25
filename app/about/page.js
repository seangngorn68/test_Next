// app/about/page.js
import Link from 'next/link';
import {items} from '../items'
import Users from '../components/users'
const AboutPage = () => {
//   const items = [
//     { id: 1, name: 'Item One',age:'13' },
//     { id: 2, name: 'Item Two',age:'22' },
//     { id: 3, name: 'Item Three',age:'20'},
//   ];

  return (
    <div>
      <h1>About Page</h1>
      <p>Click on an item to see its details:</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/about/${item.id}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <Users/>
    </div>
  );
};

export default AboutPage;
