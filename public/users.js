window.users = (() => {
    function make() {
        const members = model().users;

        const conf = members.map((user) => ({
            label: user.full_name,
            view: build_user_view(user),
        }));

        const pane_widget = split_pane.make(conf, 'users');

        async function get_message_data(user_id) {
            // TODO: cache data for user
            const narrow = JSON.stringify([
                {
                    operator: 'pm-with',
                    operand: [user_id],
                },
            ]);
            const response = await fetch(
                `/z/messages?num_before=5&anchor=newest&num_after=0&narrow=${narrow}`
            );
            const message_data = await response.json();
            return message_data;
        }

        function build_user_view(user) {
            return async () => {
                const data = await get_message_data(user.user_id);
                const message_table = messages.build_message_table(
                    data.messages
                );

                const div = $('<div>');
                div.append(message_table);
                div.append(compose_box.build_for_user(user));

                return div;
            };
        }

        async function render() {
            const pane = await pane_widget.render();

            return pane;
        }

        return {
            render: render,
        };
    }

    return {
        make: make,
    };
})();
