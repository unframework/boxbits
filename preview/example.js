
b = require('boxbits');

b.display(
    b.column(
        b.row(
            b.box('topMenu'),
            b.spacer(),
            b.icon('topBarLogo'),
            b.spacer(),
            b.box('searchBox'),
            b.box('profileIcon'),
            b.box('statusButton')
        )
    )
)
