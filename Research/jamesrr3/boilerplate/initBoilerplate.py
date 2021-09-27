import os
import shutil
from pathlib import Path


path = os.getcwd()
dst = os.getcwd()
root = path.split('\\')[0]
folder = path.split('\\')[len(path.split('\\'))-1]

while(folder != "Research" and folder != root):
    os.chdir('..')
    path = os.getcwd()
    print(folder)
    folder = path.split('\\')[len(path.split('\\'))-1]

if folder == "Research":
    shutil.copyfile(".\\jamesrr3\\boilerplate\\index.html", dst)
    shutil.copyfile(".\\jamesrr3\\boilerplate\\index.js", dst)
    print("boiler code files copied. make sure you run npm init")
else:
    print("could not find the research folder. make sure you call this script from your github folder (or a child thereof).")