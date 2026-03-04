const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BEZ CHESS ONLINE - Educational API",
      version: "2.0.0",
      description:
        "Complete REST API for BEZ CHESS ONLINE - An online chess learning platform",
      contact: {
        name: "BEZ CHESS Team",
        email: "support@bezchess.com",
        url: "https://bezchess.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      x_logo: {
        url: "https://bezchess.com/logo.png",
      },
    },
    externalDocs: {
      description: "Find out more about BEZ CHESS",
      url: "https://bezchess.com",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development Server",
        variables: {
          port: {
            default: "5000",
          },
        },
      },
      {
        url: "https://api.bezchess.com/api",
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "JWT token for authentication. Use the token returned from /auth/signin endpoint",
        },
      },
      schemas: {
        // User Schema
        User: {
          type: "object",
          required: ["email", "name", "role"],
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
              description: "Unique identifier",
            },
            username: {
              type: "string",
              description: "Username for login",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            name: {
              type: "string",
              description: "Full name",
            },
            role: {
              type: "string",
              enum: ["admin", "teacher", "parent", "student"],
              description: "User role",
            },
            phone: {
              type: "string",
              description: "Phone number",
            },
            avatar: {
              type: "string",
              description: "Avatar URL",
            },
            bio: {
              type: "string",
              description: "User biography",
            },
            isActive: {
              type: "boolean",
              default: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Course Schema
        Course: {
          type: "object",
          required: ["title", "description", "instructor"],
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            title: {
              type: "string",
              description: "Course title",
            },
            slug: {
              type: "string",
              description: "URL-friendly course name",
            },
            description: {
              type: "string",
              description: "Detailed course description",
            },
            category: {
              type: "array",
              items: { type: "string" },
              description: "Course categories",
            },
            level: {
              type: "string",
              enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
            },
            price: {
              type: "number",
              description: "Course price",
            },
            instructor: {
              type: "string",
              format: "ObjectId",
              description: "Instructor user ID",
            },
            thumbnail: {
              type: "string",
              description: "Course thumbnail image URL",
            },
            enrollment: {
              type: "number",
              description: "Number of enrolled students",
            },
            rating: {
              type: "number",
              minimum: 0,
              maximum: 5,
            },
            isPublished: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Schedule Schema
        Schedule: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            student: {
              type: "string",
              format: "ObjectId",
            },
            lesson: {
              type: "string",
              format: "ObjectId",
            },
            dayOfWeek: {
              type: "integer",
              minimum: 0,
              maximum: 6,
              description: "0=Sunday, 6=Saturday",
            },
            startTime: {
              type: "string",
              format: "time",
            },
            endTime: {
              type: "string",
              format: "time",
            },
            status: {
              type: "string",
              enum: ["scheduled", "ongoing", "completed", "cancelled"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Post (Blog) Schema
        Post: {
          type: "object",
          required: ["title", "content"],
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            title: {
              type: "string",
              description: "Post title",
            },
            slug: {
              type: "string",
              description: "URL-friendly post name",
            },
            content: {
              type: "string",
              description: "Post content (markdown or HTML)",
            },
            author: {
              type: "string",
              format: "ObjectId",
              description: "Author user ID",
            },
            category: {
              type: "string",
              description: "Post category",
            },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "Post tags",
            },
            thumbnail: {
              type: "string",
              description: "Post thumbnail image",
            },
            likes: {
              type: "array",
              items: { type: "string" },
              description: "User IDs who liked",
            },
            comments: {
              type: "array",
              description: "Post comments",
            },
            isPublished: {
              type: "boolean",
              default: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Chapter Schema
        Chapter: {
          type: "object",
          required: ["courseId", "title"],
          properties: {
            _id: { type: "string", format: "ObjectId" },
            courseId: { type: "string", format: "ObjectId" },
            title: { type: "string" },
            description: { type: "string" },
            order: { type: "integer" },
            isPublished: { type: "boolean", default: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        // Lesson Schema
        Lesson: {
          type: "object",
          required: ["chapterId", "title"],
          properties: {
            _id: { type: "string", format: "ObjectId" },
            chapterId: { type: "string", format: "ObjectId" },
            title: { type: "string" },
            description: { type: "string" },
            content: { type: "string" },
            videoUrl: { type: "string" },
            duration: { type: "integer", description: "Duration in minutes" },
            order: { type: "integer" },
            isPublished: { type: "boolean", default: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        // Enrollment Schema
        Enrollment: {
          type: "object",
          properties: {
            _id: { type: "string", format: "ObjectId" },
            userId: { type: "string", format: "ObjectId" },
            courseId: { type: "string", format: "ObjectId" },
            enrolledAt: { type: "string", format: "date-time" },
            status: { type: "string", enum: ["active", "completed", "dropped"] },
            progress: { type: "number", minimum: 0, maximum: 100 },
            completedLessons: { type: "array", items: { type: "string" } },
          },
        },

        // Attendance Schema
        Attendance: {
          type: "object",
          properties: {
            _id: { type: "string", format: "ObjectId" },
            studentId: { type: "string", format: "ObjectId" },
            classId: { type: "string", format: "ObjectId" },
            date: { type: "string", format: "date" },
            status: { type: "string", enum: ["present", "absent", "late", "excused"] },
            notes: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // Finance Schema
        Finance: {
          type: "object",
          properties: {
            _id: { type: "string", format: "ObjectId" },
            studentId: { type: "string", format: "ObjectId" },
            amount: { type: "number" },
            type: { type: "string", enum: ["payment", "refund", "discount"] },
            status: { type: "string", enum: ["pending", "completed", "failed"] },
            description: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // Order Schema
        Order: {
          type: "object",
          properties: {
            _id: { type: "string", format: "ObjectId" },
            userId: { type: "string", format: "ObjectId" },
            courseId: { type: "string", format: "ObjectId" },
            amount: { type: "number" },
            status: { type: "string", enum: ["pending", "paid", "cancelled"] },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // Learning Schema
        Learning: {
          type: "object",
          properties: {
            _id: { type: "string", format: "ObjectId" },
            userId: { type: "string", format: "ObjectId" },
            courseId: { type: "string", format: "ObjectId" },
            progress: { type: "number", minimum: 0, maximum: 100 },
            completedLessons: { type: "array", items: { type: "string" } },
            lastAccessed: { type: "string", format: "date-time" },
            startedAt: { type: "string", format: "date-time" },
            completedAt: { type: "string", format: "date-time" },
          },
        },

        // Contact Schema
        Contact: {
          type: "object",
          properties: {
            _id: { type: "string", format: "ObjectId" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            subject: { type: "string" },
            message: { type: "string" },
            status: { type: "string", enum: ["new", "read", "responded", "closed"] },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // Error Response
        Error: {
          type: "object",
          properties: {
            statusCode: {
              type: "integer",
            },
            message: {
              type: "string",
            },
            error: {
              type: "string",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },

      responses: {
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        Unauthorized: {
          description: "Unauthorized - Missing or invalid token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        Forbidden: {
          description: "Forbidden - Insufficient permissions",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        BadRequest: {
          description: "Bad Request - Invalid input",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },

      parameters: {
        pageParam: {
          name: "page",
          in: "query",
          description: "Page number (starts from 1)",
          schema: {
            type: "integer",
            default: 1,
          },
        },
        limitParam: {
          name: "limit",
          in: "query",
          description: "Items per page",
          schema: {
            type: "integer",
            default: 10,
          },
        },
        searchParam: {
          name: "search",
          in: "query",
          description: "Search keyword",
          schema: {
            type: "string",
          },
        },
        idParam: {
          name: "id",
          in: "path",
          required: true,
          description: "Resource ID",
          schema: {
            type: "string",
          },
        },
      },
    },

    paths: {
      "/auth/signup": { post: { tags: ["Authentication"], summary: "Register a new user", operationId: "signUp", requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["username", "email", "password", "name", "role"], properties: { username: { type: "string" }, email: { type: "string", format: "email" }, password: { type: "string", format: "password" }, name: { type: "string" }, role: { type: "string", enum: ["admin", "teacher", "parent", "student"] }, phone: { type: "string" } } } } } }, responses: { 201: { description: "User registered successfully", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "object", properties: { user: { $ref: "#/components/schemas/User" }, token: { type: "string" } } } } } } }, 400: { $ref: "#/components/responses/BadRequest" } } } },
      "/auth/signin": { post: { tags: ["Authentication"], summary: "User login", operationId: "signIn", requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["email", "password"], properties: { email: { type: "string", format: "email" }, password: { type: "string", format: "password" } } } } } }, responses: { 200: { description: "Login successful", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "object", properties: { user: { $ref: "#/components/schemas/User" }, token: { type: "string" } } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/auth/logout": { post: { tags: ["Authentication"], summary: "Logout user", operationId: "logout", security: [{ bearerAuth: [] }], responses: { 200: { description: "Logged out successfully" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/auth/refresh": { post: { tags: ["Authentication"], summary: "Refresh JWT token", operationId: "refresh", responses: { 200: { description: "Token refreshed", content: { "application/json": { schema: { type: "object", properties: { token: { type: "string" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/auth/logout-all": { post: { tags: ["Authentication"], summary: "Logout from all sessions", operationId: "logoutAll", security: [{ bearerAuth: [] }], responses: { 200: { description: "Logged out from all sessions" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/users/me": { get: { tags: ["Users"], summary: "Get current user profile", operationId: "getMe", security: [{ bearerAuth: [] }], responses: { 200: { description: "Current user profile", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, put: { tags: ["Users"], summary: "Update user profile", operationId: "updateProfile", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" }, phone: { type: "string" }, avatar: { type: "string" }, bio: { type: "string" } } } } } }, responses: { 200: { description: "Profile updated", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/users/change-password": { post: { tags: ["Users"], summary: "Change password", operationId: "changePassword", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["oldPassword", "newPassword"], properties: { oldPassword: { type: "string", format: "password" }, newPassword: { type: "string", format: "password" } } } } } }, responses: { 200: { description: "Password changed successfully" }, 400: { $ref: "#/components/responses/BadRequest" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/users/teachers": { get: { tags: ["Users"], summary: "Get all teachers", operationId: "getTeachers", parameters: [{ $ref: "#/components/parameters/pageParam" }, { $ref: "#/components/parameters/limitParam" }], responses: { 200: { description: "List of teachers", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/User" } } } } } } } } },
      "/users": { post: { tags: ["Users"], summary: "Create new user (Admin only)", operationId: "createUser", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["email", "name", "role"], properties: { email: { type: "string", format: "email" }, name: { type: "string" }, role: { type: "string", enum: ["admin", "teacher", "parent", "student"] }, phone: { type: "string" } } } } } }, responses: { 201: { description: "User created", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } }, get: { tags: ["Users"], summary: "Get all users (Admin only)", operationId: "getAllUsers", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/pageParam" }, { $ref: "#/components/parameters/limitParam" }], responses: { 200: { description: "List of users", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/User" } } } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/users/{id}": { get: { tags: ["Users"], summary: "Get user by ID (Admin only)", operationId: "getUserById", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "User details", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } }, 403: { $ref: "#/components/responses/Forbidden" }, 404: { $ref: "#/components/responses/NotFound" } } }, put: { tags: ["Users"], summary: "Update user (Admin only)", operationId: "updateUser", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } }, responses: { 200: { description: "User updated", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } }, delete: { tags: ["Users"], summary: "Delete user (Admin only)", operationId: "deleteUser", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "User deleted" }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/courses": { get: { tags: ["Courses"], summary: "Get all courses", operationId: "getCourses", parameters: [{ $ref: "#/components/parameters/pageParam" }, { $ref: "#/components/parameters/limitParam" }, { $ref: "#/components/parameters/searchParam" }], responses: { 200: { description: "List of courses", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Course" } } } } } } } }, post: { tags: ["Courses"], summary: "Create a new course (Admin only)", operationId: "createCourse", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Course" } } } }, responses: { 201: { description: "Course created", content: { "application/json": { schema: { $ref: "#/components/schemas/Course" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/courses/managed-courses": { get: { tags: ["Courses"], summary: "Get managed courses (Admin only)", operationId: "getManagedCourses", security: [{ bearerAuth: [] }], responses: { 200: { description: "List of managed courses", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Course" } } } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/courses/{id}": { get: { tags: ["Courses"], summary: "Get course details", operationId: "getCourse", parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Course details", content: { "application/json": { schema: { $ref: "#/components/schemas/Course" } } } }, 404: { $ref: "#/components/responses/NotFound" } } }, put: { tags: ["Courses"], summary: "Update course (Admin only)", operationId: "updateCourse", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Course" } } } }, responses: { 200: { description: "Course updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Course" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } }, delete: { tags: ["Courses"], summary: "Delete course (Admin only)", operationId: "deleteCourse", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Course deleted" }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/courses/{courseId}/chapters": { get: { tags: ["Courses"], summary: "Get course chapters", operationId: "getCourseChapters", parameters: [{ name: "courseId", in: "path", required: true, description: "Course ID", schema: { type: "string" } }], responses: { 200: { description: "List of chapters", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Chapter" } } } } } } } } },
      "/chapters": { post: { tags: ["Chapters"], summary: "Create chapter (Admin only)", operationId: "createChapter", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Chapter" } } } }, responses: { 201: { description: "Chapter created", content: { "application/json": { schema: { $ref: "#/components/schemas/Chapter" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/chapters/{courseId}": { post: { tags: ["Chapters"], summary: "Create chapter in course (Admin only)", operationId: "createChapterInCourse", security: [{ bearerAuth: [] }], parameters: [{ name: "courseId", in: "path", required: true, description: "Course ID", schema: { type: "string" } }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Chapter" } } } }, responses: { 201: { description: "Chapter created", content: { "application/json": { schema: { $ref: "#/components/schemas/Chapter" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/chapters/{id}": { put: { tags: ["Chapters"], summary: "Update chapter (Admin only)", operationId: "updateChapter", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Chapter" } } } }, responses: { 200: { description: "Chapter updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Chapter" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } }, delete: { tags: ["Chapters"], summary: "Delete chapter (Admin only)", operationId: "deleteChapter", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Chapter deleted" }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/chapters/reorder": { put: { tags: ["Chapters"], summary: "Reorder chapters (Admin only)", operationId: "reorderChapters", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { chapters: { type: "array", items: { type: "object", properties: { _id: { type: "string" }, order: { type: "integer" } } } } } } } } }, responses: { 200: { description: "Chapters reordered" }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/lessons": { post: { tags: ["Lessons"], summary: "Create lesson (Admin only)", operationId: "createLesson", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Lesson" } } } }, responses: { 201: { description: "Lesson created", content: { "application/json": { schema: { $ref: "#/components/schemas/Lesson" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/lessons/chapter/{chapterId}": { get: { tags: ["Lessons"], summary: "Get lessons by chapter", operationId: "getChapterLessons", parameters: [{ name: "chapterId", in: "path", required: true, description: "Chapter ID", schema: { type: "string" } }], responses: { 200: { description: "List of lessons", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Lesson" } } } } } } } }, post: { tags: ["Lessons"], summary: "Create lesson in chapter (Admin only)", operationId: "createLessonInChapter", security: [{ bearerAuth: [] }], parameters: [{ name: "chapterId", in: "path", required: true, description: "Chapter ID", schema: { type: "string" } }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Lesson" } } } }, responses: { 201: { description: "Lesson created", content: { "application/json": { schema: { $ref: "#/components/schemas/Lesson" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/lessons/{lessonId}": { get: { tags: ["Lessons"], summary: "Get lesson for user", operationId: "getLessonForUser", security: [{ bearerAuth: [] }], parameters: [{ name: "lessonId", in: "path", required: true, description: "Lesson ID", schema: { type: "string" } }], responses: { 200: { description: "Lesson details", content: { "application/json": { schema: { $ref: "#/components/schemas/Lesson" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, put: { tags: ["Lessons"], summary: "Update lesson (Admin only)", operationId: "updateLesson", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Lesson" } } } }, responses: { 200: { description: "Lesson updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Lesson" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } }, delete: { tags: ["Lessons"], summary: "Delete lesson (Admin only)", operationId: "deleteLesson", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Lesson deleted" }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/lessons/reorder": { put: { tags: ["Lessons"], summary: "Reorder lessons (Admin only)", operationId: "reorderLessons", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { lessons: { type: "array", items: { type: "object", properties: { _id: { type: "string" }, order: { type: "integer" } } } } } } } } }, responses: { 200: { description: "Lessons reordered" }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/enrollments": { post: { tags: ["Enrollments"], summary: "Create enrollment", operationId: "createEnrollment", security: [{ bearerAuth: [] }], parameters: [{ name: "courseId", in: "query", required: true, description: "Course ID", schema: { type: "string" } }], responses: { 201: { description: "Enrolled successfully", content: { "application/json": { schema: { $ref: "#/components/schemas/Enrollment" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/enrollments/my-courses": { get: { tags: ["Enrollments"], summary: "Get my enrolled courses", operationId: "getMyCourses", security: [{ bearerAuth: [] }], responses: { 200: { description: "List of enrolled courses", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Enrollment" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/enrollments/{courseId}/progress": { get: { tags: ["Enrollments"], summary: "Get course progress", operationId: "getCourseProgress", security: [{ bearerAuth: [] }], parameters: [{ name: "courseId", in: "path", required: true, description: "Course ID", schema: { type: "string" } }], responses: { 200: { description: "Course progress", content: { "application/json": { schema: { $ref: "#/components/schemas/Enrollment" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/enrollments/{id}/revoke": { patch: { tags: ["Enrollments"], summary: "Revoke enrollment (Admin only)", operationId: "revokeEnrollment", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Enrollment revoked" }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/enrollments/course/{courseId}/students": { get: { tags: ["Enrollments"], summary: "Get course students (Admin only)", operationId: "getCourseStudents", security: [{ bearerAuth: [] }], parameters: [{ name: "courseId", in: "path", required: true, description: "Course ID", schema: { type: "string" } }], responses: { 200: { description: "List of students", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/User" } } } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/schedules": { post: { tags: ["Schedules"], summary: "Create schedule", operationId: "createSchedule", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Schedule" } } } }, responses: { 201: { description: "Schedule created", content: { "application/json": { schema: { $ref: "#/components/schemas/Schedule" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, get: { tags: ["Schedules"], summary: "Get all schedules", operationId: "getSchedules", parameters: [{ $ref: "#/components/parameters/pageParam" }, { $ref: "#/components/parameters/limitParam" }], responses: { 200: { description: "List of schedules", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Schedule" } } } } } } } } },
      "/schedules/day/{dayOfWeek}": { get: { tags: ["Schedules"], summary: "Get schedules by day", operationId: "getSchedulesByDay", parameters: [{ name: "dayOfWeek", in: "path", required: true, description: "Day of week (0-6)", schema: { type: "integer" } }], responses: { 200: { description: "List of schedules", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Schedule" } } } } } } } } },
      "/schedules/my-schedules": { get: { tags: ["Schedules"], summary: "Get my schedules", operationId: "getMySchedules", security: [{ bearerAuth: [] }], responses: { 200: { description: "List of my schedules", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Schedule" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/schedules/{id}": { get: { tags: ["Schedules"], summary: "Get schedule by ID", operationId: "getScheduleById", parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Schedule details", content: { "application/json": { schema: { $ref: "#/components/schemas/Schedule" } } } }, 404: { $ref: "#/components/responses/NotFound" } } }, put: { tags: ["Schedules"], summary: "Update schedule", operationId: "updateSchedule", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Schedule" } } } }, responses: { 200: { description: "Schedule updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Schedule" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, delete: { tags: ["Schedules"], summary: "Delete schedule", operationId: "deleteSchedule", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Schedule deleted" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/schedules/{id}/status": { patch: { tags: ["Schedules"], summary: "Update schedule status", operationId: "updateScheduleStatus", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["status"], properties: { status: { type: "string", enum: ["scheduled", "ongoing", "completed", "cancelled"] } } } } } }, responses: { 200: { description: "Status updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Schedule" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/attendance": { post: { tags: ["Attendance"], summary: "Record attendance", operationId: "recordAttendance", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Attendance" } } } }, responses: { 201: { description: "Attendance recorded", content: { "application/json": { schema: { $ref: "#/components/schemas/Attendance" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/attendance/class/{classId}": { get: { tags: ["Attendance"], summary: "Get attendance by class", operationId: "getAttendanceByClass", security: [{ bearerAuth: [] }], parameters: [{ name: "classId", in: "path", required: true, description: "Class ID", schema: { type: "string" } }], responses: { 200: { description: "List of attendance records", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Attendance" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/attendance/class/{classId}/stats": { get: { tags: ["Attendance"], summary: "Get attendance statistics", operationId: "getAttendanceStats", security: [{ bearerAuth: [] }], parameters: [{ name: "classId", in: "path", required: true, description: "Class ID", schema: { type: "string" } }], responses: { 200: { description: "Attendance statistics", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "object" } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/attendance/my-attendance": { get: { tags: ["Attendance"], summary: "Get my attendance records", operationId: "getMyAttendance", security: [{ bearerAuth: [] }], responses: { 200: { description: "My attendance records", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Attendance" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/attendance/{id}": { get: { tags: ["Attendance"], summary: "Get attendance record", operationId: "getAttendanceById", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Attendance record", content: { "application/json": { schema: { $ref: "#/components/schemas/Attendance" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, put: { tags: ["Attendance"], summary: "Update attendance", operationId: "updateAttendance", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Attendance" } } } }, responses: { 200: { description: "Attendance updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Attendance" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, delete: { tags: ["Attendance"], summary: "Delete attendance", operationId: "deleteAttendance", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Attendance deleted" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/finance/transactions": { post: { tags: ["Finance"], summary: "Create transaction", operationId: "createTransaction", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Finance" } } } }, responses: { 201: { description: "Transaction created", content: { "application/json": { schema: { $ref: "#/components/schemas/Finance" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, get: { tags: ["Finance"], summary: "Get all transactions", operationId: "getTransactions", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/pageParam" }, { $ref: "#/components/parameters/limitParam" }], responses: { 200: { description: "List of transactions", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Finance" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/finance/transactions/{id}": { get: { tags: ["Finance"], summary: "Get transaction by ID", operationId: "getTransactionById", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Transaction details", content: { "application/json": { schema: { $ref: "#/components/schemas/Finance" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, put: { tags: ["Finance"], summary: "Update transaction", operationId: "updateTransaction", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Finance" } } } }, responses: { 200: { description: "Transaction updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Finance" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, delete: { tags: ["Finance"], summary: "Delete transaction", operationId: "deleteTransaction", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Transaction deleted" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/finance/kpi": { get: { tags: ["Finance"], summary: "Get finance KPI", operationId: "getFinanceKPI", security: [{ bearerAuth: [] }], responses: { 200: { description: "Finance KPI", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "object" } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/finance/revenue/monthly": { get: { tags: ["Finance"], summary: "Get monthly revenue", operationId: "getMonthlyRevenue", security: [{ bearerAuth: [] }], responses: { 200: { description: "Monthly revenue", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array" } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/finance/dashboard": { get: { tags: ["Finance"], summary: "Get finance dashboard", operationId: "getFinanceDashboard", security: [{ bearerAuth: [] }], responses: { 200: { description: "Finance dashboard data", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "object" } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/orders": { post: { tags: ["Orders"], summary: "Create order", operationId: "createOrder", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } }, responses: { 201: { description: "Order created", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/orders/my-orders": { get: { tags: ["Orders"], summary: "Get my orders", operationId: "getMyOrders", security: [{ bearerAuth: [] }], responses: { 200: { description: "My orders", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/orders/{id}/cancel": { put: { tags: ["Orders"], summary: "Cancel order", operationId: "cancelOrder", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Order cancelled", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/orders/{id}/pay": { put: { tags: ["Orders"], summary: "Mark order as paid (Admin only)", operationId: "markAsPaid", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Order marked as paid", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/learning": { get: { tags: ["Learning"], summary: "Get my learning", operationId: "getMyLearning", security: [{ bearerAuth: [] }], responses: { 200: { description: "My learning records", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Learning" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/learning/{id}": { get: { tags: ["Learning"], summary: "Get learning record by ID", operationId: "getLearningById", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Learning record", content: { "application/json": { schema: { $ref: "#/components/schemas/Learning" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, delete: { tags: ["Learning"], summary: "Delete learning record", operationId: "deleteLearning", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Learning record deleted" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/learning/course/{courseId}/progress": { get: { tags: ["Learning"], summary: "Get course progress", operationId: "getProgress", security: [{ bearerAuth: [] }], parameters: [{ name: "courseId", in: "path", required: true, description: "Course ID", schema: { type: "string" } }], responses: { 200: { description: "Course progress", content: { "application/json": { schema: { $ref: "#/components/schemas/Learning" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, put: { tags: ["Learning"], summary: "Update progress", operationId: "updateProgress", security: [{ bearerAuth: [] }], parameters: [{ name: "courseId", in: "path", required: true, description: "Course ID", schema: { type: "string" } }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Learning" } } } }, responses: { 200: { description: "Progress updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Learning" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/learning/{courseId}/lessons/{lessonId}/complete": { post: { tags: ["Learning"], summary: "Mark lesson as complete", operationId: "markLessonComplete", security: [{ bearerAuth: [] }], parameters: [{ name: "courseId", in: "path", required: true, description: "Course ID", schema: { type: "string" } }, { name: "lessonId", in: "path", required: true, description: "Lesson ID", schema: { type: "string" } }], responses: { 200: { description: "Lesson marked as complete", content: { "application/json": { schema: { $ref: "#/components/schemas/Learning" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/contacts": { post: { tags: ["Contacts"], summary: "Create contact", operationId: "createContact", requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Contact" } } } }, responses: { 201: { description: "Contact created", content: { "application/json": { schema: { $ref: "#/components/schemas/Contact" } } } } } }, get: { tags: ["Contacts"], summary: "Get all contacts", operationId: "getContacts", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/pageParam" }, { $ref: "#/components/parameters/limitParam" }], responses: { 200: { description: "List of contacts", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Contact" } } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/contacts/{id}": { get: { tags: ["Contacts"], summary: "Get contact by ID", operationId: "getContactById", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Contact details", content: { "application/json": { schema: { $ref: "#/components/schemas/Contact" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, put: { tags: ["Contacts"], summary: "Update contact", operationId: "updateContact", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Contact" } } } }, responses: { 200: { description: "Contact updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Contact" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/contacts/{id}/respond": { post: { tags: ["Contacts"], summary: "Respond to contact", operationId: "respondToContact", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["response"], properties: { response: { type: "string" } } } } } }, responses: { 200: { description: "Response sent", content: { "application/json": { schema: { $ref: "#/components/schemas/Contact" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/contacts/registration": { post: { tags: ["Contacts"], summary: "Create registration", operationId: "createRegistration", requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" }, email: { type: "string", format: "email" }, phone: { type: "string" }, courseId: { type: "string" } } } } } }, responses: { 201: { description: "Registration created", content: { "application/json": { schema: { type: "object" } } } } } }, get: { tags: ["Contacts"], summary: "Get all registrations", operationId: "getRegistrations", security: [{ bearerAuth: [] }], responses: { 200: { description: "List of registrations", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array" } } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/contacts/registration/{id}": { get: { tags: ["Contacts"], summary: "Get registration by ID", operationId: "getRegistrationById", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Registration details", content: { "application/json": { schema: { type: "object" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, put: { tags: ["Contacts"], summary: "Update registration", operationId: "updateRegistration", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } }, responses: { 200: { description: "Registration updated", content: { "application/json": { schema: { type: "object" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } }, delete: { tags: ["Contacts"], summary: "Delete registration", operationId: "deleteRegistration", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Registration deleted" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/contacts/registration/{id}/approve": { post: { tags: ["Contacts"], summary: "Approve registration", operationId: "approveRegistration", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Registration approved" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/contacts/registration/{id}/reject": { post: { tags: ["Contacts"], summary: "Reject registration", operationId: "rejectRegistration", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Registration rejected" }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/posts": { get: { tags: ["Posts"], summary: "Get all blog posts", operationId: "getPosts", parameters: [{ $ref: "#/components/parameters/pageParam" }, { $ref: "#/components/parameters/limitParam" }], responses: { 200: { description: "List of posts", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Post" } } } } } } } }, post: { tags: ["Posts"], summary: "Create blog post (Admin only)", operationId: "createPost", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } }, responses: { 201: { description: "Post created", content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/posts/count": { get: { tags: ["Posts"], summary: "Get total posts count", operationId: "getPostsCount", responses: { 200: { description: "Posts count", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "object", properties: { count: { type: "integer" } } } } } } } } } },
      "/posts/search": { get: { tags: ["Posts"], summary: "Search posts", operationId: "searchPosts", parameters: [{ $ref: "#/components/parameters/searchParam" }], responses: { 200: { description: "Search results", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Post" } } } } } } } } },
      "/posts/author/{authorId}": { get: { tags: ["Posts"], summary: "Get posts by author", operationId: "getPostsByAuthor", parameters: [{ name: "authorId", in: "path", required: true, description: "Author ID", schema: { type: "string" } }], responses: { 200: { description: "Posts by author", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { type: "array", items: { $ref: "#/components/schemas/Post" } } } } } } } } },
      "/posts/{id}": { get: { tags: ["Posts"], summary: "Get post by ID", operationId: "getPost", parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Post details", content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } }, 404: { $ref: "#/components/responses/NotFound" } } }, put: { tags: ["Posts"], summary: "Update post (Admin only)", operationId: "updatePost", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } }, responses: { 200: { description: "Post updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } }, 403: { $ref: "#/components/responses/Forbidden" } } }, delete: { tags: ["Posts"], summary: "Delete post (Admin only)", operationId: "deletePost", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Post deleted" }, 403: { $ref: "#/components/responses/Forbidden" } } } },
      "/posts/{id}/like": { post: { tags: ["Posts"], summary: "Toggle post like", operationId: "toggleLike", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], responses: { 200: { description: "Like toggled", content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/posts/{id}/comment": { post: { tags: ["Posts"], summary: "Add comment to post", operationId: "addComment", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/idParam" }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["content"], properties: { content: { type: "string" } } } } } }, responses: { 200: { description: "Comment added", content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
      "/posts/{id}/comment/{commentId}": { delete: { tags: ["Posts"], summary: "Delete comment from post", operationId: "deleteComment", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, description: "Post ID", schema: { type: "string" } }, { name: "commentId", in: "path", required: true, description: "Comment ID", schema: { type: "string" } }], responses: { 200: { description: "Comment deleted", content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } }, 401: { $ref: "#/components/responses/Unauthorized" } } } },
    },

    tags: [
      { name: "Authentication", description: "User registration, login and authentication" },
      { name: "Users", description: "User profile and management (CRUD)" },
      { name: "Courses", description: "Course management and details" },
      { name: "Chapters", description: "Course chapter management" },
      { name: "Lessons", description: "Course lesson management" },
      { name: "Enrollments", description: "Student course enrollment" },
      { name: "Schedules", description: "Class schedule management" },
      { name: "Attendance", description: "Student attendance tracking" },
      { name: "Finance", description: "Financial transactions and reporting" },
      { name: "Orders", description: "Course order management" },
      { name: "Learning", description: "Student learning progress tracking" },
      { name: "Contacts", description: "Contact messages and registration" },
      { name: "Posts", description: "Blog posts and articles" },
    ],
  },

  // Empty array - not using JSDoc comments in route files
  apis: [],
};

module.exports = swaggerJsdoc(options);
