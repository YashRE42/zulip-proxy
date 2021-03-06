const assert = require('assert');
global.window = {};
global.deepmerge = require('deepmerge');
const model = require('../client/model');

// Get the model.
let m = model.main;

assert(typeof m === 'object');
m.user_id = 10;
assert(model.main.user_id === 10);

// Tests for ZulipAccessor based models.

assert(model.Users.list().length === 0);
model.Users.add({
    user_id: 1,
    full_name: 'Test User',
    email: 'test@example.com',
});
let test_user = model.Users.by_id(1);
// property mappings
assert(test_user.id === test_user.user_id);
test_user.id = 2;
assert(test_user.id === test_user.user_id);
assert(test_user.name === test_user.full_name);
test_user.name = 'Testing User';
assert(test_user.name === test_user.full_name);

assert(model.Streams.list().length === 0);
model.Streams.add({
    stream_id: 1,
    name: 'Test Stream',
});
let test_stream = model.Streams.by_id(1);
assert(test_stream.id === test_stream.stream_id);
test_stream.id = 2;
assert(test_stream.id === test_stream.stream_id);

// messages
model.Messages.add({
    id: 1,
    content: 'Test content',
});
assert(model.Messages.by_id(1).content === 'Test content');
model.Messages.update_message(1, 'Updated content');
assert(model.Messages.by_id(1).content === 'Updated content');

console.log('model: Passed tests');
