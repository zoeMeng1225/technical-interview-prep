### System Design: New Feed(Fecebook style)

## Requirements Analysis

# What are the core features to be supported?

    - Browse news feed containing posts by the user and their friends
    - Liking and reacting to feed posts
    - Creating and publishing new posts

# What pagination UX should be used for the feed？

infinite scrolling, meaning more posts will be added when the user reaches the end of their feed.

# Will the app be used on mobile devices?

Not a priority, but a good mobile experience would be nice

- **Functional**
  - Infinite scrolling(loading more as user scrolls)
  - Support rich media(text, images)
  - **Data consistency**, Likes/Comments must update instantly aross the app

- **Non-Function**
  - **Performace**: maintain 60fps scrolling even with complex DOM
  - **Latency**: First contenful paint(FCP) < 1.5s
  * **Reliability**: Graceful degradation on network failure

## API Design: cursor-based pagination

**Decision**: use **Cursor-based** instead of Offset-based pagination

- **Why?** In the real-time feed, new posts are constantly added to the top. Using `offset`(e.g., "skip 10") would cause **duplicate posts** or missed content when the user loads pages 2

* **Request**: `GET /feed?cursor=post_id_123&limit=10`
* **Response**:
  ```json
  {
      "data":[...post],
      "nextCursor": "post_id_456",
      "hasMore": true
  }
  ```

## Data Model: Normalization(Crucial)

To ensure data consistancy (e.g., updating a user's avater updates all their posts), we utilize a **Normailized State Shape**

```typescript
interface Store {
  //Database-like structure
  entities: {
    posts: {
      p1: { id: "p1"; autorId: "u1"; content: "..." };
    };
    users: {
      u1: { id: "u1"; name: "John"; avatar: "..." };
    };
  };
  //order is stored separately
  feed: ["p1", "p2", "p3"];
}
```

## Component Architecture & Optimization

- Virtualization: use `react-window` to only render item in the viewpoint to reduce DOM nodes
- Image Optimization: Lazy Load images and use `SrcSet` for responsive sizing
- Infinite Scroll: implement via `IntersectionObserver` API(better performance than scroll event listener)

## Archtecture Diagram

Graph TD
User[User Scroll] -->|Trigger| Observer[Intersection Observer]
Observer -->|Dispatch| Action[Fetch More]
Action -->|Cursor| API[Backend API]
API -->|Raw JSON| Normalizer[Data Normalizer]
Normalizer -->|Entities| Store[Global Store]
Store -->|Select Data| List[Virtual List]
List -->|Render| UI[feed UI]
