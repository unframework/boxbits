
var b = require('boxbits');

// from https://www.iconfinder.com/icons/196757/box_package_products_icon#size=128
var topBarLogo = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAVA0lEQVR4Xu1dC3BU13n+z90XEkJPkCBgTwBbYJvISLLBL94YEFo5xq0MSBqH1E0z06aDa2cm9bROxklbO2mwSZPptE3dhgYEQolx0AvEO41xgOwKBOGNoUY2CJBAb+3rnv5npRWSWN29d+/Zs3fR3hkGmz33P///n++e+93//Oc/BO7D6yuFJWlWKmfLkjQDgMwkANPwTxYQyKAAGUAhgRBiRtPH9ZvfQSn14u892K4Ff2/Bds3451MAelaS5XNuIp0/WVN++35zF9ob21f+8rJJYJafoxJ5Bi3J6x/wzEhYhYC4wQCBsp1EpofBK/3OsXvztUj0JUpmzAHgoYICW4opfQGlZAUhtAAImSnKWUH7ofQs6lKHuuxq87UeulhX54qqPho7jwkA5OfnW2hW9hIwSavxCX8RlU7VaKeQ5jhD3MEZ4iPwyRWk+fw+h8PhEdKxjk4MDYD8gtXTZZP5VULgawTIl3TYKfxWCvQLSmGT5PN+4KiruCRcAZUdGhIA+YUli0Aib6ADVyJZM6SOKv0LSC4pWlALMt3gqCk/oPY+Ue0M5dy8laV2MJHvoVJPiHKAyH7wFfEHoL7vO6u3VonsV6kvQwAg3166DJX8ARK6OUZxTET1oPQoyn/LUb2lPqL9qBAeVQDkLS9+iFitG5HYFarQ9f5rQqGWelzrnbsrL0bLuKgAYMrTxQlZGdbvUgKvI7mzRst4I/SLZNFNKLzX3OL+ftMnlT2idRIOgNn2soUS0P9AbvewaGON3B9yxQuE0m+KJorCAMACOMlSxjtA6GuxzuwjBST2xQCUbGyXW94UFVASAoC8wtWPgGTZhp3lRMp595Nc/FpoBNmzxllTcSbSdkUcAHkry14GE/0A3/VJkTbmfpKPU0En+MirztrN2yNpVwQBUGzKs1vfQeW/HZ/ywxvC/lfCBmeN628BKn3hSVG+KyIAyFm2bKzZOuGXOPCrIqH0qJNJ4SOP+0ZZY319F2/buQMgZ9mqTIs1sWrUBHV4j8hI8jB45HF3FzXW78AlaX4XVwDkPr/mS8Rm3oux70f4qRiXFPAAfiOcoS7v0oY9277g5RVuAJi9Ys2XTRbzflRsKi/l4nKCeuCyz+NdfHzXtis8/MMFADkFpVPMZnIAhT3EQ6m4jJAeuOTx0oWNdVuaQrYM0UA3AHILiicQk+1QfNrXOxQa78dMJNnnnt9QV3lT451DmusCQH5RUSLQlP2YTDlXjxLxe8P0AIUjQNoWO6qqusOUgEMX9uX/zv8QP/VeCFtE/EbdHsBYwU5ntfulcOMEYQMg316yAYj0um4L4gL0e4DK7zmqy98IR1BYAMCUrWLMc6qIR/jCcTn/e/xpZ5SuxpXESq3SNQOgb2HHfDQe29fq6si2xxhBF/XROQ11W05r6UkTAPxLuuYMHPz7Y1Vv/qNscxDAb097tfjMsG3ZKmK7t2WOlqVkTQDIKyx7j0jwN4b1gErFHp0iwV/bLfBkdp/5x85T+Gm1B043ySolGLcZriJudFZtUT1GqgHQn8mzP5bf+5kpEnyrwAwrn5QwDXHYIOLjU3tMhp/VeeFGW+wCoZ8PLFGbWaQKACyHL3O8rTFWI31jbQReXWKGNQsksFqUTXZ7KGw7JMMH+7zQ5UJUxOCFWl+8ccuVoybHUBUA8ovK3kU/fCfWfGHGB/3FOWb4ixUmSE9WZeqAia3tFH6+2wc7jnjBG5sTwg8dVZsxj0D5CumVx1euzjZLllM4ZVpCCTPS74zgvVZkggezQpqoqPZnuEl8Y5Uv9ogiBY9X9sw6UVtxXsnAkN7JKyqtwk8+u5EGV0kXP8ErRII3I6RpmkyKTaJIaxxVWxTHTtFLuYUlSyVJ2qPJU1FqrEjweOkUg0RRluXnG2rK947kAkUA5NvLfm/0hZ4AwVs9XwKble9TP5LT3D4rOJpmwg82nYAbdwxeDgAziXAL2oiLdSN6LM++togQ005eDw9vOXoIXvi6IKsclw+QPA/AlAjg6YTqPfXwj5sawOMz7hcDpb4XRtqQOiIAcMOmA/P6sOSK8S5eBE+TZYmY5ZayEMCScc9tns6r8NNf1kL5vquaRAprTKkTZwFE7r1XUACwoI+JgOH2skeK4CkOhG0K1iNZAmB7QHm85F7449H/gR9uazJkRBEnqEXHqzcfHG5EUAAYjfkLIXjDPWNOx4FfDJAYogQRlcHb5gD3zf2QYHHjpInVIAwYUcQQcTWGiItCAgBLrE2zEHLRCCHfaBA8kPDdnjofYGwuhotNik+93HkWept3g0m+gwQU2w56nIwWUWQhYg+lD2GpOyx9d/e6ZwbItZf+k0TIm8LeT0E6igrBIxjnGodkOflpAMmmaD7tacKB3wXE3eQfeCKN/PVhqIgipe8iFxgytkM1X7jQnJ805SoieWK0ACCe4KELxuKe1ZQFAOZkZbPdt6H35l7ctfdH/8BLSJTUXoaIKFK47uhsegAOHhxY/x5iQW5RaYEEpFatUTzbRYXgjZne9563Zimb4usG961D4Gk7BmNwojCZ8HMwzCvaEUUflQuPV5cPjPEQACD5+28M+64L07awbosKwbPggDNmnzBNWWesHutt/T24Wn8HVskFFosyJ1DtgChGFJEM/gLJ4NcDug4AoD/b5zr+g5AijFEheCac4lNxqmdTvmJCNAVfWyO4bu4DM3TgEvJQgqd6oEM0jAZRZMUsMWtoYiBraAAA/kpdhOzmZdxIcqJC8BipS34WSR4WIfPXiB75ol2XoOfGHjB5m3Hg8YWoQPB4+Uo4UaR0eaBC2SAAiEnz3ra+G6ZNGYcESsTqciB0i591pgTl8eptRoKH6149F0Mye14DP1iO24WBpAvN8I3/CsFHeHQ+KI188AxwRkTh5b1/14rVMwHcciJkjk/GJyx8QqXoCxa6ZQTPnKbsMk87uG4dBF+7Ewde0kXwwhkbn9cLV642Y0WY2/6X0pp/E7C9EreV4Qzg38HtBwDb1i2NMX8ejgFa72EACFxeHzrckghpqVi2n1dFWH/o9nkM3U5WVk12gbflMLhbP8apXgYzezcJvKgswxfXb0J7+y2wSHcXkoQAAO30UteUE9WVn/cBoLBkDa77bxVh/2AABPrr9UgwLikZxiZhFC7cyx+6XYqh22xlCYNCtxaplx+z16B3S8ttaL6JHEO6Nx1dFAAwT2At5gmwwl14yoK9ZCMh0noNNoTdNBgAAsK63RaYkJEMFqtyJG5I5/7QLWP2s3WFbsM2SMON3V2dcPnqdbAh8Ea6RAGAUvknzury1/oBUHoYY/8YA438pQSAQO9dbhtMykxWJoosdJv8FDJ7/MMxdBsJDzCCd+lKM1hIR0jxogCA5xp8jOlizzEAEMz6bcO/A+fnhFRSTwM1AGDyRyaKqHISPu0sKUNV6LYeQ7dnNIdu9dgYuHc4wVMjUxwAoAOzhlNIzrLiqRabbcgKkRpFw22jFgAB+UOIInu/s6QMgaHbcOwcieCpkSUQAOBxuaaR/MKyQpCgWo1yPNpoBUCgzx4kipPyN+D3vAI/wNCtB0O3bt6hWw2GKxE8NWJEAgBksJM8e+lf4fv/Z2qU49EmXACwvlNno5q4OfHeS0zoVsl+NQRPjf9EAgBTBL5FcMPnP6NPv61GOR5tdAEg91/vUSEaodvBSmgheGr8JxQAMvyYEUBWi7ZYjXI82vAGwJWPX4cHJqWAycxppU6lkeEQPDWiRQIAmfavEAClWNuPLFKjHI82vAFwp+EvISIRxRGM1UPw1PhPKACAHiC4+eMkBoRnqVGORxs9AEie8RZ4PG1gS7mbqMkAMJgoJuuNKCoYqZfgqfGfUABQOMUAcE1kCpgeAHT3eMFkTYKs3HfA3X4RrGmPwWAABBzMIorj01PAauNzGk1XZydcaVKO4KkZXDVtxAKAXmOvADztkqSoUY5HGz0AYP37A0TSRDxp5wZk5bwNbWfeGlEtVRFFBaN4Ezw1/hMKAKBtBNPAOkQWfNILAOZEWaYgYaIGHTMLSO8pRb8ywLhw6TlLw9IzI3iXcYmW9i/Rqhk4Xm1EAoAdSsG+AoRuauMBgICzvbjdxawyM1cNUYw0wVMDEpEAYPrENADUOHR4GxZRDEYUGcG7jku0tiBLtOH0E+49wgEQi6+AcJ07+L4AUfR43MIInhq9RQKg/xUQWyRQjRO1tLnVcjdDSct9kWorEgBIqdti6jMwEk4f1QCg7DMwhgJBcQBw9oA/EBRDoWDO5vvFjeoZwB8KjqHFoDgAOHuALQbF0nIwZ/NH/QyACdI/jqmEkDgA+HrAnxASKylhfE2/K21UcwCWEmb0pNBIDXxA7mgGgD8ptD8cbLi08EgPfBwA/WnhzBGYGGqojSGiBn90fwbe3RhimK1hIgd+tM8AQ7aGRXtzaDQGfrQDYMjm0MftxZPNxKb7HFo1A8kzH0BNf6HajFYSOGR7OHMSlogRViAi1KCI/H1UAmB4gQg/ERR0Ilh8BlCGt4jlYIwAvu+s2ew/9VV4kag4AKIPAMysvbdIlKgycXOm+mDd4i7InmiMwxqN8gq4fDMBKo5kwPGmMRF9A45YJs7PA4pKf4GTwtciqgEKZ9s7FzzihVcWdMMDGdEFQrQBcO2ODX51bDx8cikBN+uKuOgmLAyxLtDTkEqhs+0lK01EqhGhBuuDJfQuf9wDZfO6ITPZJ6rbIf1ECwCtXVb49bF0OHA+CdPcxZmuWCoWolQsmhXifPEJN6x5pgdSEsUCQTQAOlxmqHJkQO2pJDyPUH2xaS4QwWLRcO3Mgw6HwxN0Buj/HHwHS7aFPHCQi0LDhCTiTq6X57ph1dwuGGsTs11BFAC6MR1994kM2HkiGXo8ggc+4OeQ5eKxoREOjEhLoLD2WRcU5neDTbmyq24cRhoAHq8Ee0+nwg5nKrT3iq1FONg5/jOFfd6HHXUVlwb/e1AoIhnEkjGkULd3dQrISqbwyrxeWJrTAzoqtCtqESkAsPf6/55Lg+2ONGjpjN7ADxhPodZRvfmeMY2JQ6MezJBh3YIemDfTxa2gaMAxvAHAXlxHL6VAxbE0+OJOhKcvDQ+YpkOj+rmA4Y6Ny54ow58t7IEnpvM7rJEnABo/GwfbjqbDp7dEFMLWMPpaj41jojFHYBUWj/pQQzfCmuY+6IOvL+6BRye7dffJAwAXrif6gzinrmmocKpbc/UC8PX/krN6y45gdyjRUZYy7sCb8PgsY17PZnth3cJumDoh/GCSHgBcbRkD249mwLH/C1GKPrrua8CCkOzQyKCfVYrfI6IOkdDjH1ZkfNksLwaTumBSmvYYQjgAaO6wwg6M3h26kOgvWGHkC7e8r3DWlI94EEjID1KjfBGEcjKr9m7PdUPJcz2QnqQeCFoAcKfHDB/9YTzsPcOCOKE0MsLvOo+PZybkrCibYTEDKyRlMGYT3MFjkHj/yRw3/OlT3TAuIfQoqQFAl9sENQ3pUH0yGdzekM+MEUaeTfgeIL4cR9XWs0oKqbIGucC7KOQ7xrBMnRZJuKi25qle+OqTPZBgHXmeVgJALwZx6hvTYefxFOh0q3KVOuUEtELi9yMkfiHHTJVVU54uTsgcb2vExgLOM+HrnYwkCqUYVVyZ243lZO6VHQwAPozRHzidBr92pMLtHgMEcTS6BOF+8cYtV07TJ5U9oW5VBQAmJL+wZBElZJ8RzhQOZVSw3yelUlg3vxcWz+oZEkwaDABG6A5fSIXtx1KhucM4QRwt9vpDvpQucdSUqzr9XTUAmBJYTuZ9rCj2mhaFjNZ26oS+YNJT2RhVROUYANgLouFKXxDns9aYoDojujWQ7q3W75oA0J81dBRvYicvxvT12GQEwqJuaG/rwIHPgHPNfIpKRtMpCOTG1o6muVcOHhz5TJphCmoCALs3t6D0UTx78YjI2oLRdGqs9I2vry7qo3Ma6rac1qKzZgD084Fi5AMVscoHtDgoVtpSH6x21m5mld81XWEBwA8Cu5iTRjVZM1obDzoJVKsLwgYAHjFgyrNbP8RZ4AWtncbb8/MAkv6dzmr3SwCV6sOfg7rXAQCWRVyEwfCU/Uin5/IzKS5JtQcoHAHStthRVdWt+h69JHB4R7kFxRMkk/W3Is4dDtfI+/M+ek72uuc11FXe1GOfrhkg0HFOQekUi5kcxP+frkeZ+L0qPUDppx4fLGis26J7Qy8XADC1+0vN7MP/nKrSjHiz8DxwGUu7LGmsr7wc3u1D7+IGACbWfwq5zbQv/jrgMTRBZOCuXi+4l7JTv3n1wBUAfTPBqkyzNbEavw6e5KVkXA47KYUe87q77Y31O27w9Ad3APSBYNlYizVzM34dvMhT2dEri/7G47pZ2lhf38XbBxEBQJ+SGCcotL0r8lBK3s4xgjxWzdNZ48KdWuF954eyIYIA6Osas4tX40zwn/G1g1BDMfR3dpgDLlP+OSZ1VGi7U1vriAOAqfP48rWPma3SVtxt9BVt6o3W1vSkR/aWNNZUKJ+IxcE9QgDA9PzywoVj0sdNfgdRvT6+iBR85FgyB86WP2nt+PxNLUu6enAgDAABJfMK1i7G3Kx/j8X0Mj2ODnUvS+PCM3C/6azbikf5iruEA4CZxnIMszKs36UEXkduEPuZGDrGC9/1mG5K3m++5XpbTQ6fjq6C3hoVAAQ0wYokD0tE+hdUYgVvw2JBHj71u3w+z/oTtRXno6VvVAEQMJrtQEJn/MNoCR6xoA46/u8d1VvqozXwgX4NAYABfmBfW4QlpL6HQGB72e67Cwce91rKbzurt2L9heB79UQbbSgADMwImIIOEnkDOfHKWP9i8KdpE6gFmW5Qm6otEgSGBMAAEApWTwez5RsYCH8FF5gmiXSM7r5YQSYCm8Dr+fnwsiy6ZXMUYGgADAAhP9/imzTjeRMhL+OH8ldR6VSOPuAmihVhxDPNf+OjdLvp2rk9g6txceuEs6CYAMBgm9nehBRT+gKcWFcQQguivvSMS7SoSx3qsqvN13roYl0dv/IlnAc7mLiYA8BwI/yl7qnlGSqRZ5BWIXkkM/GdOyESvkNOgulX9CxO7Q4i08Ne4jnMc20+EjqHkhnzAAhmIJa6S7NSORuIaSbu85yBRk5DYEzEvzNwADNwqh6DwRcbDmSi/34K3RiQceHvuKOGtODvLfiP1/HvTyUK54D6zrqJdP5kTfntUA6Ntd//H5JlXmcz57KfAAAAAElFTkSuQmCC';

b.display(
    b.column(
        b.row(
            b.box('topMenu'),
            b.spacer(),
            b.icon(100, 100, topBarLogo),
            b.spacer(),
            b.box('searchBox'),
            b.box('profileIcon'),
            b.box('statusButton')
        )
    )
)
