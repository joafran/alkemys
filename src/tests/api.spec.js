import request from 'supertest';
import { expect } from 'chai';
import server from '../server';
import { Character } from '../models';


const api = request(server);

describe('---Characters Routes---', () => {
    it('It should return all the characters and only with the "img" and "name" properties', async () => {
        const res = await api.get('/characters')
        expect(res.body).to.be.an('array')
        if(res.body.length > 0) {
            res.body.forEach( character => {
                // Object keys will return an array with the properties of each character
                expect(Object.keys(character))
                .to.have.length(2, 'GET /characters should return only img and name properties')
            })
        }
    });

    it("Should return a JSON of the character and it's movies", async () => {
        const res = await api.get('/characters/1')
        const character = res.body;
        expect(character).to.contain.property('movies')
    });

    it("Should return an error if the character doesn't exist", async () => {
        const res = await api.get('/characters/-1').expect(404)
        expect(res.body).to.be.an('Object');
        expect(res.body).to.contain.property('message');
        expect(res.body.message).to.be.equal("The character doesn't exist");
    });

    it("Should create a character", async () => {
        let character = {
            name: 'Character name',
            story: 'A brief story',
            age: 15
        }
        const { body } = await api.post('/characters').send(character).expect(200)
        const newCharacter = body;
        character = await Character.findByPk(newCharacter.id)
        expect(character.story).to.be.equal('A brief story');
    });

    it("Should return an error if 'name' was not provided", done => {
        const character = {
            name: null,
            story: 'A brief story',
            age: 150
        }
        api
        .post('/characters')
        .send(character)
        .expect(400, done);
    });

    it("Should update a character", async () => {
        const updateCharacter = { name: "My new name", story: "My brief story", age: 1, weight: 30, img: 'www.img.com/' }
        const res = await api.put('/characters/1').send(updateCharacter)
        expect(res.body.name).to.be.equal("My new name")
        expect(res.body.story).to.be.equal("My brief story")
        expect(res.body.age).to.be.equal(1)
        expect(res.body.weight).to.be.equal(30)
        expect(res.body.img).to.be.equal("www.img.com/")
    });
})