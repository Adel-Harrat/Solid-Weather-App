import { Title } from "@solidjs/meta";
import { For, Match, Switch, createResource } from "solid-js";
import { isServer } from "solid-js/web";

// Weather api string
// http://api.weatherapi.com/v1/forecast.json?key=c8d5a3373bb74ef591a173934241409&q=Mostaganem&days=7&aqi=no&alerts=no

type Post = {
  id: string;
  title: string;
  body: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  if (!response.ok) throw new Error("Error when fetching!");
  return await response.json();
};

export default function Home() {
  const [posts, { refetch }] = createResource<Post[]>(fetchPosts);

  return (
    <main class="p-10">
      <Title>Solid Weather App</Title>
      <h1 class="text-3xl text-center p-5">Home Page</h1>
      <button onclick={() => refetch()}>Reload posts</button>

      <Switch>
        <Match when={posts.state === "pending" || posts.state === "unresolved"}>
          <div>Fetching Posts ...</div>
        </Match>
        <Match when={posts.state === "ready"}>
          <section class="space-y-5 rounded">
            <For each={posts()}>
              {(post) => (
                <article class="bg-gray-50/50 p-5 space-y-2 capitalize">
                  <h2 class="font-extrabold tracking-tight text-2xl ">
                    {post.title}
                  </h2>
                  <p>{post.body}</p>
                </article>
              )}
            </For>
          </section>
        </Match>
        <Match when={posts.state === "errored"}>
          <div>Sorry, but we couldn't fetch posts.</div>
        </Match>
      </Switch>
    </main>
  );
}
