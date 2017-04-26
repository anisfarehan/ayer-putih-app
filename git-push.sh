git init
git add -A
git commit -a -m "$(date '+%A %d-%b-%y %r')"
git remote add origin git@github.com:anisfarehan/${PWD##*/}.git
git push -u origin v2
read -n1 -r -p "Press any key to continue..." key
