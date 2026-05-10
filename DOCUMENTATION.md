# Finterns Architecture: The "Image to Card" System 🖼️

*(Explain Like I'm Five Edition)*

Welcome! If you are wondering how pictures get onto the learning cards in our app without using the internet or waiting, here is the secret recipe.

We built a super-fast, offline-ready system. We call it the **Asset ➔ Key ➔ Card** relationship.

---

### 1. The Library (Data/Cards) 📚
Think of the curriculum data files (`src/data/curriculum/...`) as a bunch of books (Cards). 
In the old days, these books had blank spaces and tried to call a very slow artist on the phone (`imagePrompt`) to draw a picture every time you turned the page. The artist would get tired (Error 429) and stop answering!

So, we erased the artist's phone number! Now, we just put a simple **Tag** (called `imageKey`) in the book.
- *Example*: If a card teaches you about budgets, it simply says: `imageKey: "budgeting"`.

### 2. The Index (ImageKey) 🏷️
The `imageKey` is the bridge. It is just a simple word that connects the book to the right picture. 
We have a list of these tags inside `src/lib/imageResolver.ts`. 

### 3. The Picture Box (Assets) 📦
We have a big, heavy box full of high-quality, pre-drawn pictures sitting right inside our app (`/public/assets/education/`). Because they are inside the app, we never have to wait for the internet to download them.

### 4. The Magic Rule (Resolver) ✨
When you open a book (view a Card on the screen), our app has a "Magic Rule" (the pure function `resolveImage`). 
It looks at the tag (`imageKey: "budgeting"`), reaches into the Picture Box, and grabs the exact picture *instantly*. No waiting, no loading screens! If a card forgets its tag, the Magic Rule just hands it a nice, generic backup picture so the page is never blank.

---

## 👩‍💻 Technical Simplification for Future Engineers

To keep this production-ready and incredibly fast, the code now follows a strict **Unidirectional Data Flow**:

1. **Static Data:** Lessons in `/src/data/curriculum` are just text + an `imageKey` string. No generated prompts, no messy URLs.
2. **Pure Function:** The `resolveImage(card)` function is completely synchronous. It takes a card, reads the key, and returns a local string path. It has no side effects and no `async/await`.
3. **UI Component:** The `<Card />` component simply renders `<img src={resolveImage(card)} />`. We completely removed React `useEffect` hooks and `isLoading` states for images. 

Fast. Clean. Bulletproof. 🚀
