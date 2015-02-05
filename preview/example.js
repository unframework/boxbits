
b = window.b;

b.display(
    b.overlap([
        b.west(topMenu = b.box()),
        b.center(topBarLogo = b.icon()),
        b.east(
            b.row([
                searchBox = b.box(),
                profileIcon = b.box(),
                searchBox = b.box()
            ])
        )
    ])
)
