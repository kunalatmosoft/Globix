// /app/blog/[slug]/page.js
const blogPosts = {
    'dynamic-routing': {
      title: 'Dynamic Routing in Next.js',
      content: 'Dynamic routing allows you to create pages dynamically based on URL parameters.',
    },
    'tailwind-guide': {
      title: 'Guide to Tailwind CSS with Next.js',
      content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.',
    },
    'Grafana': {
      title: 'Guide to Garafanad CSS with Next.js',
      content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.',
    },
    'Microsoft world': {
      title: 'Guide to Tailwind CSS with Next.js',
      content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.',
    },
  };
  
  export default function BlogPost({ params }) {
    const { slug } = params;
    const post = blogPosts[slug];
  
    if (!post) {
      return <div className="text-red-600">Post not found.</div>;
    }
  
    return (
      <article className="bg-white shadow p-6 rounded">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700">{post.content}</p>
      </article>
    );
  }
  