// /app/page.js
import Link from 'next/link';

const blogPosts = [
  { slug: 'dynamic-routing', title: 'Dynamic Routing in Next.js' },
  { slug: 'tailwind-guide', title: 'Guide to Tailwind CSS with Next.js' },
  { slug: 'Grafana', title: 'Guide to Grafana with Next.js' },
  { slug: 'Microsoft world', title: 'Guide to Microsoft with Next.js' },
];

export default function HomePage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Welcome to My Blog</h2>
      <ul className="space-y-4">
        {blogPosts.map((post) => (
          <li key={post.slug} className="bg-white shadow p-4 rounded">
            <Link href={`/level/${post.slug}`}
              className="text-blue-600 hover:underline font-semibold text-xl">
                {post.title}
             
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
