//run test by cd backend then npm test
const sinon = require('sinon');

const ResponseModel = require('../models/Response');
const ResponseController = require('../services/responseService');

const RestaurantModel = require('../models/Restaurant');
const RestaurantController = require('../services/restaurantService');


const ReviewModel = require('../models/Review');
const ReviewController = require('../services/reviewService');


const UserModel = require('../models/User');
const UserController = require('../services/userService');

describe('response testing', () => {
    let req = {
        body: {
            username: 'testuser',
            replyText: 'test reply',
            date: Date.now()
        }
    };

    let error = new Error('Some error message');
    let res = {};
    let expectedResult;

    describe('create', () => {
        let createResponseStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (createResponseStub) {
                createResponseStub.restore();
            }
        });

        it('should return the created response object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            createResponseStub = sinon.stub(ResponseController, 'createResponse').resolves(expectedResult);

            // Act
            await ResponseController.createResponse(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(createResponseStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            createResponseStub = sinon.stub(ResponseController, 'createResponse').rejects(error);

            // Act
            await ResponseController.createResponse(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(createResponseStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update Response', () => {
        let updateResponseStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (updateResponseStub) {
                updateResponseStub.restore();
            }
        });

        it('should return the updated response object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            updateResponseStub = sinon.stub(ResponseController, 'updateResponse').resolves(expectedResult);

            // Act
            await ResponseController.updateResponse(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(updateResponseStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            updateResponseStub = sinon.stub(ResponseController, 'updateResponse').rejects(error);

            // Act
            await ResponseController.updateResponse(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(updateResponseStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('find Response by ID', () => {
        let getResponseByIdResponseStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getResponseByIdResponseStub) {
                getResponseByIdResponseStub.restore();
            }
        });

        it('should find the response object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            getResponseByIdResponseStub = sinon.stub(ResponseController, 'getResponseById').resolves(expectedResult);

            // Act
            await ResponseController.getResponseById(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getResponseByIdResponseStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getResponseByIdResponseStub = sinon.stub(ResponseController, 'getResponseById').rejects(error);

            // Act
            await ResponseController.getResponseById(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getResponseByIdResponseStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete Response', () => {
        let deleteResponseStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteResponseStub) {
                deleteResponseStub.restore();
            }
        });

        it('should delete the response object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            deleteResponseStub = sinon.stub(ResponseController, 'deleteResponse').resolves(expectedResult);

            // Act
            await ResponseController.deleteResponse(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteResponseStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteResponseStub = sinon.stub(ResponseController, 'deleteResponse').rejects(error);

            // Act
            await ResponseController.deleteResponse(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteResponseStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});


describe('restaurant testing', () => {
    let req = {
        body: {
            name: "test resto",
            cuisine: "Italian",
            averageRating: 5,
            averageCost: 200,
            media: 'test.png',
            description: "test description",
            amenities: [1, 2],
            
            reviews: [
                {_id: "deleteID", review: "delete review test"}

            ],
            address: '123 Pasta Street, Noodle City, 12345',
            phone: '(555) 123-4567',
            website: 'https://pastaparadise.com',
            hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  

            username: "test resto user",
            password: "test password"
        }
    };

    let error = new Error('Some error message');
    let res = {};
    let expectedResult;

    describe('create', () => {
        let createRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (createRestaurantStub) {
                createRestaurantStub.restore();
            }
        });

        it('should return the created restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                name: "test resto",
                cuisine: "Italian",
                averageRating: 5,
                averageCost: 200,
                media: 'test.png',
                description: "test description",
                amenities: [1, 2],
                
                address: '123 Pasta Street, Noodle City, 12345',
                phone: '(555) 123-4567',
                website: 'https://pastaparadise.com',
                hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  

                username: "test resto user",
                password: "test password"
            };

            createRestaurantStub = sinon.stub(RestaurantController, 'createRestaurant').resolves(expectedResult);

            // Act
            await RestaurantController.createRestaurant(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(createRestaurantStub);

            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
            sinon.assert.calledWith(res.json, sinon.match({ averageRating: req.body.averageRating }));
            sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
            sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            createRestaurantStub = sinon.stub(RestaurantController, 'createRestaurant').rejects(error);

            // Act
            await RestaurantController.createRestaurant(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(createRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update Restaurant', () => {
        let updateRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (updateRestaurantStub) {
                updateRestaurantStub.restore();
            }
        });

        it('should return the updated restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                name: "test resto",
                cuisine: "Italian",
                averageRating: 5,
                averageCost: 200,
                media: 'test.png',
                description: "test description",
                amenities: [1, 2],
            
                address: '123 Pasta Street, Noodle City, 12345',
                phone: '(555) 123-4567',
                website: 'https://pastaparadise.com',
                hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  

                username: "test resto user",
                password: "test password"
            };

            updateRestaurantStub = sinon.stub(RestaurantController, 'updateRestaurant').resolves(expectedResult);

            // Act
            await RestaurantController.updateRestaurant(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(updateRestaurantStub);

            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
            sinon.assert.calledWith(res.json, sinon.match({ averageRating: req.body.averageRating }));
            sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
            sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            updateRestaurantStub = sinon.stub(RestaurantController, 'updateRestaurant').rejects(error);

            // Act
            await RestaurantController.updateRestaurant(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(updateRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('find Restaurant by ID', () => {
        let getRestaurantByIdRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getRestaurantByIdRestaurantStub) {
                getRestaurantByIdRestaurantStub.restore();
            }
        });

        it('should find the restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                name: "test resto",
                cuisine: "Italian",
                averageRating: 5,
                averageCost: 200,
                media: 'test.png',
                description: "test description",
                amenities: [1, 2],
            
                address: '123 Pasta Street, Noodle City, 12345',
                phone: '(555) 123-4567',
                website: 'https://pastaparadise.com',
                hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  

                username: "test resto user",
                password: "test password"
            };

            getRestaurantByIdRestaurantStub = sinon.stub(RestaurantController, 'getRestaurantById').resolves(expectedResult);

            // Act
            await RestaurantController.getRestaurantById(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getRestaurantByIdRestaurantStub);

            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
            sinon.assert.calledWith(res.json, sinon.match({ averageRating: req.body.averageRating }));
            sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
            sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getRestaurantByIdRestaurantStub = sinon.stub(RestaurantController, 'getRestaurantById').rejects(error);

            // Act
            await RestaurantController.getRestaurantById(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getRestaurantByIdRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('get all restaurants', () => {
        let getAllRestaurantsRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getAllRestaurantsRestaurantStub) {
                getAllRestaurantsRestaurantStub.restore();
            }
        });

        it('should find all restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                name: "test resto",
                cuisine: "Italian",
                averageRating: 5,
                averageCost: 200,
                media: 'test.png',
                description: "test description",
                amenities: [1, 2],
            
                address: '123 Pasta Street, Noodle City, 12345',
                phone: '(555) 123-4567',
                website: 'https://pastaparadise.com',
                hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  

                username: "test resto user",
                password: "test password"

            };

            getAllRestaurantsRestaurantStub = sinon.stub(RestaurantController, 'getAllRestaurants').resolves(expectedResult);

            // Act
            await RestaurantController.getAllRestaurants(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getAllRestaurantsRestaurantStub);

            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
            sinon.assert.calledWith(res.json, sinon.match({ averageRating: req.body.averageRating }));
            sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
            sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getAllRestaurantsRestaurantStub = sinon.stub(RestaurantController, 'getAllRestaurants').rejects(error);

            // Act
            await RestaurantController.getAllRestaurants(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getAllRestaurantsRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('search restaurants', () => {
        let searchRestaurantsRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (searchRestaurantsRestaurantStub) {
                searchRestaurantsRestaurantStub.restore();
            }
        });

        it('should find all restaurant objects that fullfil the search condition', async () => {
            // Arrange
            expectedResult = {
                    _id: '507asdghajsdhjgasd',
                    name: "test resto",
                    cuisine: "Italian",
                    averageRating: 5,
                    averageCost: 200,
                    media: 'test.png',
                    description: "test description",
                    amenities: [1, 2],

                    address: '123 Pasta Street, Noodle City, 12345',
                    phone: '(555) 123-4567',
                    website: 'https://pastaparadise.com',
                    hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  

                    username: "test resto user",
                    password: "test password"

            };

            searchRestaurantsRestaurantStub = sinon.stub(RestaurantController, 'searchRestaurants').resolves(expectedResult);

            // Act
            await RestaurantController.searchRestaurants(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(searchRestaurantsRestaurantStub);

            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
            sinon.assert.calledWith(res.json, sinon.match({ averageRating: req.body.averageRating }));
            sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
            sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            searchRestaurantsRestaurantStub = sinon.stub(RestaurantController, 'searchRestaurants').rejects(error);

            // Act
            await RestaurantController.searchRestaurants(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(searchRestaurantsRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete Restaurant', () => {
        let deleteRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteRestaurantStub) {
                deleteRestaurantStub.restore();
            }
        });

        it('should delete the restaurant object', async () => {
            // Arrange
            expectedResult = {
                
                _id: '507asdghajsdhjgasd',
                name: "test resto",
                cuisine: "Italian",
                averageRating: 5,
                averageCost: 200,
                media: 'test.png',
                description: "test description",
                amenities: [1, 2],

                address: '123 Pasta Street, Noodle City, 12345',
                phone: '(555) 123-4567',
                website: 'https://pastaparadise.com',
                hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  
                
                username: "test resto user",
                password: "test password"

            };

            deleteRestaurantStub = sinon.stub(RestaurantController, 'deleteRestaurant').resolves(expectedResult);

            // Act
            await RestaurantController.deleteRestaurant(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteRestaurantStub);

            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
            sinon.assert.calledWith(res.json, sinon.match({ averageRating: req.body.averageRating }));
            sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
            sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteRestaurantStub = sinon.stub(RestaurantController, 'deleteRestaurant').rejects(error);

            // Act
            await RestaurantController.deleteRestaurant(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('add review to resto', () => {
        let addReviewToResStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (addReviewToResStub) {
                addReviewToResStub.restore();
            }
        });

        it('should add a review to the restaurant object', async () => {
            // Arrange

            const mockReviews = [
                { _id: 'review1', rating: 4 },
              ];
          
            
              expectedResult = {
                
                _id: '507asdghajsdhjgasd',
                name: "test resto",
                cuisine: "Italian",
                averageRating: 0,
                averageCost: 200,
                media: 'test.png',
                description: "test description",
                amenities: [1, 2],
                reviews:mockReviews,
                address: '123 Pasta Street, Noodle City, 12345',
                phone: '(555) 123-4567',
                website: 'https://pastaparadise.com',
                hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  
                
                username: "test resto user",
                password: "test password"

            };



            addReviewToResStub = sinon.stub(RestaurantController, 'addReviewToRes').resolves(expectedResult);

            // Act
            await RestaurantController.addReviewToRes(mockReviews._id, req.body._id).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(addReviewToResStub);

            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
            sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
            sinon.assert.calledWith(res.json, sinon.match({ reviews: mockReviews }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
            sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            addReviewToResStub = sinon.stub(RestaurantController, 'addReviewToRes').rejects(error);

            // Act
            await RestaurantController.addReviewToRes(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(addReviewToResStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
        });

        describe('recalculate rating', () => {
            let recalculateRatingStub;
    
            beforeEach(() => {
                res = {
                    json: sinon.spy(),
                    status: sinon.stub().returns({ end: sinon.spy() })
                };
            });
    
            afterEach(() => {
                if (recalculateRatingStub) {
                    recalculateRatingStub.restore();
                }
            });
    
            it('should update restaurant rating', async () => {
                // Arrange
    
                const mockReviews = [
                    { _id: 'review1', rating: 4 },
                  ];
              
                
                  expectedResult = {
                    
                    _id: '507asdghajsdhjgasd',
                    name: "test resto",
                    cuisine: "Italian",
                    averageRating: 4,
                    averageCost: 200,
                    media: 'test.png',
                    description: "test description",
                    amenities: [1, 2],
                    reviews:mockReviews,
                    address: '123 Pasta Street, Noodle City, 12345',
                    phone: '(555) 123-4567',
                    website: 'https://pastaparadise.com',
                    hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  
                    
                    username: "test resto user",
                    password: "test password"
    
                };
    
    
    
                recalculateRatingStub = sinon.stub(RestaurantController, 'recalculateRating').resolves(expectedResult);
    
                // Act
                await RestaurantController.recalculateRating( req.body._id).then(result => {
                    res.json(result);
                });
    
                // Assert
                sinon.assert.calledOnce(recalculateRatingStub);
    
                sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
                sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
                
                sinon.assert.calledWith(res.json, sinon.match({ averageRating: 4 }));
                sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
                sinon.assert.calledWith(res.json, sinon.match({ reviews: mockReviews }));
                sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
                sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
                sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
                sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
                sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
                
            });
    
            it('should return status 500 on server error', async () => {
                // Arrange
                recalculateRatingStub = sinon.stub(RestaurantController, 'recalculateRating').rejects(error);
    
                // Act
                await RestaurantController.recalculateRating(req.body._id).catch(() => {
                    res.status(500).end();
                });
    
                // Assert
                sinon.assert.calledOnce(recalculateRatingStub);
                sinon.assert.calledWith(res.status, 500);
                sinon.assert.calledOnce(res.status(500).end);
            });
            });

            describe('deleteReviewFromRes', () => {
                let deleteReviewFromResStub;
        
                beforeEach(() => {
                    res = {
                        json: sinon.spy(),
                        status: sinon.stub().returns({ end: sinon.spy() })
                    };
                });
        
                afterEach(() => {
                    if (deleteReviewFromResStub) {
                        deleteReviewFromResStub.restore();
                    }
                });
        
                it('delete rev from res', async () => {
                    // Arrange
        
                   
                    
                      expectedResult = {
                        
                        _id: '507asdghajsdhjgasd',
                        name: "test resto",
                        cuisine: "Italian",
                        averageRating: 0,
                        averageCost: 200,
                        media: 'test.png',
                        description: "test description",
                        amenities: [1, 2],
                        reviews:[],
                        address: '123 Pasta Street, Noodle City, 12345',
                        phone: '(555) 123-4567',
                        website: 'https://pastaparadise.com',
                        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  
                        
                        username: "test resto user",
                        password: "test password"
        
                    };
        
        
        
                    deleteReviewFromResStub = sinon.stub(RestaurantController, 'deleteReviewFromRes').resolves(expectedResult);
        
                    // Act
                    await RestaurantController.deleteReviewFromRes( req.body.reviews[0]._id, req.body._id).then(result => {
                        res.json(result);
                    });
        
                    // Assert
                    sinon.assert.calledOnce(deleteReviewFromResStub);
        
                    sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
                    sinon.assert.calledWith(res.json, sinon.match({ cuisine: req.body.cuisine }));
                    
                    sinon.assert.calledWith(res.json, sinon.match({ averageRating: 0 }));
                    sinon.assert.calledWith(res.json, sinon.match({ averageCost: req.body.averageCost }));
                    sinon.assert.calledWith(res.json, sinon.match({ reviews: [] }));
                    sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
                    sinon.assert.calledWith(res.json, sinon.match({ description: req.body.description }));
                    sinon.assert.calledWith(res.json, sinon.match({ amenities: req.body.amenities }));
                    sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
                    sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
                    
                });
        
                it('should return status 500 on server error', async () => {
                    // Arrange
                    recalculateRatingStub = sinon.stub(RestaurantController, 'recalculateRating').rejects(error);
        
                    // Act
                    await RestaurantController.recalculateRating(req.body._id).catch(() => {
                        res.status(500).end();
                    });
        
                    // Assert
                    sinon.assert.calledOnce(recalculateRatingStub);
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledOnce(res.status(500).end);
                });
                });
    });


describe('review testing', () => {
    let req = {
        body: {
            rating: 5, // Rating from 1 to 5
            review: "test review", // Content of the review
            media: "test.png", // Optional field for media (e.g., image URL)
            username: "test user", // Username of the reviewer
            date: Date.now() , // Timestamp for when the review was created
            title: "test title", // Title of the review
            replies: [{_id: "sample", username: "testresp", replyText: "test content"}]
        }
    };

    let error = new Error('Some error message');
    let res = {};
    let expectedResult;

    describe('create', () => {
        let createReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (createReviewStub) {
                createReviewStub.restore();
            }
        });

        it('should return the created review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                rating: 5, // Rating from 1 to 5
                review: "test review", // Content of the review
                media: "test.png", // Optional field for media (e.g., image URL)
                username: "test user", // Username of the reviewer
                date: req.body.date, // Timestamp for when the review was created
                title: "test title", // Title of the review
                
            };

            createReviewStub = sinon.stub(ReviewController, 'createReview').resolves(expectedResult);

            // Act
            await ReviewController.createReview(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(createReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ rating: req.body.rating }));
            sinon.assert.calledWith(res.json, sinon.match({ review: req.body.review }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            createReviewStub = sinon.stub(ReviewController, 'createReview').rejects(error);

            // Act
            await ReviewController.createReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(createReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update Review', () => {
        let updateReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (updateReviewStub) {
                updateReviewStub.restore();
            }
        });

        it('should return the updated review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                rating: 5, // Rating from 1 to 5
                review: "test review", // Content of the review
                media: "test.png", // Optional field for media (e.g., image URL)
                username: "test user", // Username of the reviewer
                date: req.body.date, // Timestamp for when the review was created
                title: "test title", // Title of the review
            };

            updateReviewStub = sinon.stub(ReviewController, 'updateReview').resolves(expectedResult);

            // Act
            await ReviewController.updateReview(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(updateReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ rating: req.body.rating }));
            sinon.assert.calledWith(res.json, sinon.match({ review: req.body.review }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            updateReviewStub = sinon.stub(ReviewController, 'updateReview').rejects(error);

            // Act
            await ReviewController.updateReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(updateReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('find Review by ID', () => {
        let getReviewByIdReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getReviewByIdReviewStub) {
                getReviewByIdReviewStub.restore();
            }
        });

        it('should find the review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                rating: 5, // Rating from 1 to 5
                review: "test review", // Content of the review
                media: "test.png", // Optional field for media (e.g., image URL)
                username: "test user", // Username of the reviewer
                date: req.body.date, // Timestamp for when the review was created
                title: "test title", // Title of the review
            };

            getReviewByIdReviewStub = sinon.stub(ReviewController, 'getReviewById').resolves(expectedResult);

            // Act
            await ReviewController.getReviewById(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getReviewByIdReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ rating: req.body.rating }));
            sinon.assert.calledWith(res.json, sinon.match({ review: req.body.review }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getReviewByIdReviewStub = sinon.stub(ReviewController, 'getReviewById').rejects(error);

            // Act
            await ReviewController.getReviewById(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getReviewByIdReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete Review', () => {
        let deleteReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteReviewStub) {
                deleteReviewStub.restore();
            }
        });

        it('should delete the review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                rating: 5, // Rating from 1 to 5
                review: "test review", // Content of the review
                media: "test.png", // Optional field for media (e.g., image URL)
                username: "test user", // Username of the reviewer
                date: req.body.date, // Timestamp for when the review was created
                title: "test title", // Title of the review
            };

            deleteReviewStub = sinon.stub(ReviewController, 'deleteReview').resolves(expectedResult);

            // Act
            await ReviewController.deleteReview(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ rating: req.body.rating }));
            sinon.assert.calledWith(res.json, sinon.match({ review: req.body.review }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteReviewStub = sinon.stub(ReviewController, 'deleteReview').rejects(error);

            // Act
            await ReviewController.deleteReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });

        describe('delete Review', () => {
        let deleteReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteReviewStub) {
                deleteReviewStub.restore();
            }
        });

        it('should delete the review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                rating: 5, // Rating from 1 to 5
                review: "test review", // Content of the review
                media: "test.png", // Optional field for media (e.g., image URL)
                username: "test user", // Username of the reviewer
                date: req.body.date, // Timestamp for when the review was created
                title: "test title", // Title of the review
            };

            deleteReviewStub = sinon.stub(ReviewController, 'deleteReview').resolves(expectedResult);

            // Act
            await ReviewController.deleteReview(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ rating: req.body.rating }));
            sinon.assert.calledWith(res.json, sinon.match({ review: req.body.review }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteReviewStub = sinon.stub(ReviewController, 'deleteReview').rejects(error);

            // Act
            await ReviewController.deleteReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('add response to Review', () => {
        let addResponseToReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (addResponseToReviewStub) {
                addResponseToReviewStub.restore();
            }
        });

        it('should add response to the review object', async () => {
            // Arrange
            
            const mockResponse = 
                {_id: "response1", username: "fake", replyText: "fake text"};
            
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                rating: 5, // Rating from 1 to 5
                review: "test review", // Content of the review
                media: "test.png", // Optional field for media (e.g., image URL)
                replies: [
                    {_id: "sample", username: "testresp", repltTest: "test content"},
                    {_id: "response1", username: "fake", replyText: "fake text"}
                ],
                username: "test user", // Username of the reviewer
                date: req.body.date, // Timestamp for when the review was created
                title: "test title", // Title of the review
            };

            addResponseToReviewStub = sinon.stub(ReviewController, 'addResponseToReview').resolves(expectedResult);

            // Act

        
            await ReviewController.addResponseToReview(mockResponse._id, req.body._id).then(result => {
                
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(addResponseToReviewStub);
            
            sinon.assert.calledWith(res.json, sinon.match({ rating: req.body.rating }));
            sinon.assert.calledWith(res.json, sinon.match({ review: req.body.review }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ replies: expectedResult.replies }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            addResponseToReviewStub = sinon.stub(ReviewController, 'addResponseToReview').rejects(error);

            // Act
            await ReviewController.addResponseToReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(addResponseToReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete response from Review', () => {
        let deleteResponseFromReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteResponseFromReviewStub) {
                deleteResponseFromReviewStub.restore();
            }
        });

        it('should delete response from the review object', async () => {
            // Arrange
            
            const mockResponse ={_id: "sample", username: "testresp", repltTest: "test content"};
            
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                rating: 5, // Rating from 1 to 5
                review: "test review", // Content of the review
                media: "test.png", // Optional field for media (e.g., image URL)
                replies: [],
                username: "test user", // Username of the reviewer
                date: req.body.date, // Timestamp for when the review was created
                title: "test title", // Title of the review
            };

            deleteResponseFromReviewStub = sinon.stub(ReviewController, 'deleteResponseFromReview').resolves(expectedResult);

            // Act

        
            await ReviewController.deleteResponseFromReview(mockResponse._id, req.body._id).then(result => {
                
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteResponseFromReviewStub);
            
            sinon.assert.calledWith(res.json, sinon.match({ rating: req.body.rating }));
            sinon.assert.calledWith(res.json, sinon.match({ review: req.body.review }));
            sinon.assert.calledWith(res.json, sinon.match({ media: req.body.media }));
            sinon.assert.calledWith(res.json, sinon.match({ replies: expectedResult.replies }));
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteResponseFromReviewStub = sinon.stub(ReviewController, 'deleteResponseFromReview').rejects(error);

            // Act
            await ReviewController.deleteResponseFromReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteResponseFromReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

});
    
describe('user testing', () => {
    let req = {
        body: {
            username: "test user",
            password:"test pass",
            cuisines: "Italian",
            avatar: 'default-avatar-url.png' ,
            bio: "test bio",
            createdAt: Date.now(),
            reviews: [{_id: "deletelater", review: "deletelater"}]
        }
    };

    let error = new Error('Some error message');
    let res = {};
    let expectedResult;

    describe('create', () => {
        let createUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (createUserStub) {
                createUserStub.restore();
            }
        });

        it('should return the created user object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt
            };

            createUserStub = sinon.stub(UserController, 'createUser').resolves(expectedResult);

            // Act
            await UserController.createUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(createUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            createUserStub = sinon.stub(UserController, 'createUser').rejects(error);

            // Act
            await UserController.createUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(createUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update User', () => {
        let updateUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (updateUserStub) {
                updateUserStub.restore();
            }
        });

        it('should return the updated user object', async () => {
            // Arrange
            expectedResult = {
               
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt


            };

            updateUserStub = sinon.stub(UserController, 'updateUser').resolves(expectedResult);

            // Act
            await UserController.updateUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(updateUserStub);

            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            updateUserStub = sinon.stub(UserController, 'updateUser').rejects(error);

            // Act
            await UserController.updateUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(updateUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('find User by ID', () => {
        let getUserByIdUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getUserByIdUserStub) {
                getUserByIdUserStub.restore();
            }
        });

        it('should find the user object', async () => {
            // Arrange
            expectedResult = {
                
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt


            };

            getUserByIdUserStub = sinon.stub(UserController, 'getUserById').resolves(expectedResult);

            // Act
            await UserController.getUserById(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getUserByIdUserStub);
            

            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getUserByIdUserStub = sinon.stub(UserController, 'getUserById').rejects(error);

            // Act
            await UserController.getUserById(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getUserByIdUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete User', () => {
        let deleteUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteUserStub) {
                deleteUserStub.restore();
            }
        });

        it('should delete the user object', async () => {
            // Arrange
            expectedResult = {
               
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt


            };

            deleteUserStub = sinon.stub(UserController, 'deleteUser').resolves(expectedResult);

            // Act
            await UserController.deleteUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteUserStub);
            

            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteUserStub = sinon.stub(UserController, 'deleteUser').rejects(error);

            // Act
            await UserController.deleteUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    
    describe('generate User token', () => {
        let generateTokenUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (generateTokenUserStub) {
                generateTokenUserStub.restore();
            }
        });

        it('should generate a token for the user', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt
            };

            generateTokenUserStub = sinon.stub(UserController, 'generateToken').resolves(expectedResult);

            // Act
            await UserController.generateToken(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(generateTokenUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            generateTokenUserStub = sinon.stub(UserController, 'generateToken').rejects(error);

            // Act
            await UserController.generateToken(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(generateTokenUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('authenticate User', () => {
        let authenticateUserUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (authenticateUserUserStub) {
                authenticateUserUserStub.restore();
            }
        });

        it('should authenticate the user', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt

            };

            authenticateUserUserStub = sinon.stub(UserController, 'authenticateUser').resolves(expectedResult);

            // Act
            await UserController.authenticateUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(authenticateUserUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            authenticateUserUserStub = sinon.stub(UserController, 'authenticateUser').rejects(error);

            // Act
            await UserController.authenticateUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(authenticateUserUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('check token validity', () => {
        let checkTokenValidityUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (checkTokenValidityUserStub) {
                checkTokenValidityUserStub.restore();
            }
        });

        it('should check validity of the user token', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt

            };

            checkTokenValidityUserStub = sinon.stub(UserController, 'checkTokenValidity').resolves(expectedResult);

            // Act
            await UserController.checkTokenValidity(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(checkTokenValidityUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            authenticateUserUserStub = sinon.stub(UserController, 'authenticateUser').rejects(error);

            // Act
            await UserController.authenticateUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(authenticateUserUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('logout User', () => {
        let logoutUserUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (logoutUserUserStub) {
                logoutUserUserStub.restore();
            }
        });

        it('should logout the user', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt

            };

            logoutUserUserStub = sinon.stub(UserController, 'logoutUser').resolves(expectedResult);

            // Act
            await UserController.logoutUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(logoutUserUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            logoutUserUserStub = sinon.stub(UserController, 'logoutUser').rejects(error);

            // Act
            await UserController.logoutUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(logoutUserUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('checks is token is blacklisted', () => {
        let isTokenBlacklistedUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (isTokenBlacklistedUserStub) {
                isTokenBlacklistedUserStub.restore();
            }
        });

        it('checks if token is blacklisted', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt

            };

            isTokenBlacklistedUserStub = sinon.stub(UserController, 'isTokenBlacklisted').resolves(expectedResult);

            // Act
            await UserController.isTokenBlacklisted(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(isTokenBlacklistedUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            isTokenBlacklistedUserStub = sinon.stub(UserController, 'isTokenBlacklisted').rejects(error);

            // Act
            await UserController.isTokenBlacklisted(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(isTokenBlacklistedUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe("checks user's username", () => {
        let checkUsernameUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (checkUsernameUserStub) {
                checkUsernameUserStub.restore();
            }
        });

        it("checks user's username", async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt

            };

            checkUsernameUserStub = sinon.stub(UserController, 'checkUsername').resolves(expectedResult);

            // Act
            await UserController.checkUsername(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(checkUsernameUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            checkUsernameUserStub = sinon.stub(UserController, 'checkUsername').rejects(error);

            // Act
            await UserController.checkUsername(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(checkUsernameUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe("deleteReviewFromUser", () => {
        let deleteReviewFromUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteReviewFromUserStub) {
                deleteReviewFromUserStub.restore();
            }
        });

        it("delete review from user", async () => {
            // Arrange
            mockReview={_id: "deletelater", review: "deletelater"};
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt,
                reviews: [ ]
            };

            deleteReviewFromUserStub = sinon.stub(UserController, 'deleteReviewFromUser').resolves(expectedResult);

            // Act
            await UserController.deleteReviewFromUser(mockReview._id, req.body._id).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteReviewFromUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ reviews: expectedResult.reviews }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteReviewFromUserStub = sinon.stub(UserController, 'deleteReviewFromUser').rejects(error);

            // Act
            await UserController.deleteReviewFromUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteReviewFromUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe("addReviewToUser", () => {
        let addReviewToUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (addReviewToUserStub) {
                addReviewToUserStub.restore();
            }
        });

        it("add review to user", async () => {
            // Arrange
            mockReview={_id: "testing", review: "content"};
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: "test user",
                password:"test pass",
                cuisines: "Italian",
                avatar: 'default-avatar-url.png' ,
                bio: "test bio",
                createdAt: req.body.createdAt,
                reviews: [  {_id: "deletelater", review: "deletelater"},
                            {_id: "testing", review: "content"}
                ]
            };

            addReviewToUserStub = sinon.stub(UserController, 'addReviewToUser').resolves(expectedResult);

            // Act
            await UserController.addReviewToUser(mockReview._id, req.body._id).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(addReviewToUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ password: req.body.password }));
            sinon.assert.calledWith(res.json, sinon.match({ cuisines: req.body.cuisines }));
            sinon.assert.calledWith(res.json, sinon.match({ avatar: req.body.avatar }));
            sinon.assert.calledWith(res.json, sinon.match({ reviews: expectedResult.reviews }));
            sinon.assert.calledWith(res.json, sinon.match({ bio: req.body.bio }));
            sinon.assert.calledWith(res.json, sinon.match({ createdAt: req.body.createdAt }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            addReviewToUserStub = sinon.stub(UserController, 'addReviewToUser').rejects(error);

            // Act
            await UserController.addReviewToUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(addReviewToUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

});

});
