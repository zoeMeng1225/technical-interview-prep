System Design: Autocomplete Compnent
1.Problem Statement
The goal is to build a high-performance, accessible Autocomplete component. Key challenges addressed include:

    - Race Conditions: Preventing out-of-order API response from overwriting the current UI state.
    - Performance: Reducing sever load and network latency via caching and debouncing.
    - User Experience: Ensuring smooth interactions and accessibility(A11y).

2.Architecture Diagram: Using a sequence diagram to illustrate how we handle repid user input and cancel obsolete request:

SequenceDiagram
participant U as User
participant C as Component
participant A as AbortController
participant S as Server

U->>C: Type "A"
C->>A: Create New Controller
C->>S: Fetch "A" (Signal 1)
U->>C: Type "B" (within 300ms)
C->>A: Abort Signal 1
C->>S: Fetch "AB" (Signal 2)
S-->>C: Response "AB" (Success)
S--X C: Response "A" (Canceled/Ignored)

3. Design Choices & Trade-offs

Why AbortController over an ignore flag? - Bandwidth Effiency: While an ignore variable prevents the UI from updating, AbortController actually cancels the network request at the browser level, saving data and server resource. - Native Support: It is a modern, standardized Web API that intergrates seamlessly with fetch.

Why 300ms for Debouncing? - Human Perception: Research suggests that delays under 100ms feel instantaneous, while 300ms is a "sweet spot" that balances responsiveness with enough time to let the user finish typing a meaningful substring. - Server Protection: It significantly reduces the number of "intermediate" API calls(e.g., searching for "a", then "ab", then "abc")

Caching Strategy: We use a Client-side Memory Cache(Map/Object) to store results for specific queries. This provides an instant UI update for previously searched terms and eliminates redundant network round-trip.

[View Full Implementation](../system-design/autocomplete/index.tsx)
