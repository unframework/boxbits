
b = require('boxbits');

b.display(
    b.column(
        b.row(
            [ b.box('topMenu') ],
            b.icon('topBarLogo'),
            [ b.row([], b.box('searchBox'), b.box('profileIcon'), b.box('searchBox')) ]
        )
    )
)
