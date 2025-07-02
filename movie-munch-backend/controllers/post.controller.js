

import Movie from '../models/movieModel.js';

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movies',
      error: error.message,
    });
  }
};

// Get a single movie by ID
export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById({_id:req.params.id});
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }
    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movie',
      error: error.message,
    });
  }
};
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete({_id:req.params.id});
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }
    res.status(200).json({
      success: true,
      msg:`${movie.title} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movie',
      error: error.message,
    });
  }
};
// Create a new movie
export const postMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating movie',
      error: error.message,
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    // Check if movie exists
    const movie = await Movie./* `findById` is a method provided by Mongoose, a MongoDB object modeling
    tool for Node.js, that is used to find a single document by its `_id`
    field. In the context of the code you provided, `findById` is used to
    retrieve a single movie document from the database based on the
    provided `_id` value. */
    /* `findById` is a method provided by Mongoose, a MongoDB object modeling
    tool for Node.js, that is used to find a single document by its `_id`
    field. It takes the `_id` of the document as an argument and returns
    the document that matches that `_id`. In the context of the code
    provided, `findById` is used to retrieve a single movie document based
    on the `_id` provided in the request parameters. */
    findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    // Define allowed fields for update
    const allowedUpdates = [
      'title', 'description', 'movieImage', 'genre', 'duration',
      'releaseYear', 'rating', 'videoUrl', 'trailerUrl', 'cast',
      'director', 'language', 'isAvailable'
    ];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'Invalid fields provided for update',
      });
    }

    // Perform the update
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: `${updatedMovie.title} updated successfully`,
      data: updatedMovie,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }
    // Handle duplicate title error (unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Movie title already exists',
      });
    }
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID',
      });
    }
    // General server error
    res.status(500).json({
      success: false,
      message: 'Error updating movie',
      error: error.message,
    });
  }
};

// export const deleteMovie = async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndUpdate(
//       req.params.id,
//       { deletedAt: new Date() },
//       { new: true }
//     );
//     if (!movie) {
//       return res.status(404).json({
//         success: false,
//         message: 'Movie not found',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       msg: `${movie.title} delete vayo hai`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error soft-deleting movie',
//       error: error.message,
//     });
//   }
// };

// export const recoverMovie = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) {
//       return res.status(404).json({
//         success: false,
//         message: 'Movie not found',
//       });
//     }
//     if (!movie.deletedAt) {
//       return res.status(400).json({
//         success: false,
//         message: `${movie.title} is not deleted`,
//       });
//     }
//     const updatedMovie = await Movie.findByIdAndUpdate(
//       req.params.id,
//       { deletedAt: null },
//       { new: true }
//     );
//     res.status(200).json({
//       success: true,
//       msg: `${updatedMovie.title} recovered successfully`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error recovering movie',
//       error: error.message,
//     });
//   }
// };