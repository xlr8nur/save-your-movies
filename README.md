# Save Your Movies

A Next.js application for managing your movie notes and reviews.

![movies11](https://github.com/user-attachments/assets/d22ebd4f-b19d-4291-8bb5-cb14de207610)

## Tech Stack

- Next.js 14
- MongoDB
- Tailwind CSS
- Prisma
- Zustand
- React Icons
- Framer Motion

## Features

- Create, read, update, and delete movie notes
- Animated UI components
- Toast notifications
- Responsive design
- Server-side data persistence
- Client-side state management

## Installation
```bash
1. Clone the repository:
git clone https://github.com/xlr8nur/save-your-movies.git
cd save-your-movies

2. Install dependencies:

npm install

3. Set up the database:

npx prisma generate
npx prisma db push
```

### Usage

Visit https://save-your-movies.vercel.app to use the application.

### Adding a Movie
- Click "ADD" button
- Enter movie title and content
- Submit to save

### Editing a Movie
- Click the pen icon on any movie card
- Update title or content
- Click checkmark to save changes

### Deleting a Movie
- Click the trash icon on any movie card
- Confirm deletion

### API Endpoints
- POST /api/movies/createMovie - Create a new movie
- GET /api/movies/getMovies - Get all movies
- PUT /api/movies/updateMovie - Update a movie
- DELETE /api/movies/deleteMovie - Delete a movie

### Environment Variables
```bash
Create a .env file in the root directory:

DATABASE_URL="your-database-url"
NEXT_PUBLIC_URL="your-next-url"
```
### Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request
