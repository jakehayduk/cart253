# Mod Jam Response

# Nerly Cadet

Upon first impression, I'm really liking the overall style of the side-profile illustration. Very bold, single colour shapes that make the project visually striking. The jittering quarter and eighth notes definitely give a sense of the feel of music. I can see you've incorporated something happening with the mouse when you hold down left click and a red line drags along with the mouse and also the horn gets highlighted, which is neat, although maybe it's not quite clear what it means. Is there supposed to be an interaction between the horn and the mouse? The white balls are interactive and you can drag them around which is cool. One thing I think you could add, since this seems to be a music centred piece, is some audio perhaps?

Diving into the code, a small little thing is 'let dragPoint = null;' can be simplified to just let dragPoint;' to simplify and write less.

Didn't know you could set the colour mode to HSB, I will take notes!

Now I can see you used some random math to generate each ellipse point between two numbers on each frame to make the music notes jitter. Cool!

No comments for the for loop on line 332, not quite sure what it is without looking into it.

'Set the colour based on the mouse position'. Maybe this part is not working correctly for me because I'm not seeing it in the project.

Probably a bit more explanation is needed in the form of comments with the last two mouseDragged and mousePressed functions.

Love the style and exploration of p5.js in this project, thank you for sharing!


# Liam St-Georges

Liam, this project made me laugh when I loaded it up. Not only does it look like you, but it's got your humour as well! The eyebrows going up and down are a great touch and it makes it hard to look at for too long but I think the real star of the show is the surprise OK hand sign when you hold down the left mouse button and the hand follows the mouse at the same time. Good thing that the hand is above your waist though, otherwise you'd have to punch me (Circle Game for those of you who don't know). And this is a small detail, but it's good that you've made the hand and arm slightly darker to stand out against the face.

Just upon first glance into the code, I'm a fan of the comments you've added, especially having a short description at the top.

Could just be me, but he noCursor() function doesn't seem to be working.

I'm definitely appreciating how organized this project is, with things being split up into separate functions and such.

I like the integration of the negative velocity if it's below or above a certain level on the canvas. I guess it would either be that or some kind of sine wave function to make them go up and down.

Don't forget your semicolons on lines 540 and 545. Even though they're not necessary in this particular case since it's only one line inside of the function, it's still good practice.

Overall, I really liked everything about this project, the simple but playful idea and the structure and labelling in the code is all very well done. Thank you for sharing!


# Jason Lee

As a user of your project, I appreciate the instructions on screen that say what the interactive part of it is. I love the idea for the hair, instead of just having a static shape. And the subtle sinusoidal breathing in the shapes make it feel like the character is alive. Not to mention the eyes occasionally blinking and the background continuously changing colours.

By your description of the project in your README, I can definitely say that you've accomplished the interactive experience you were looking to create!

Delving into the code, I can see another use of HSB, good thinking.

The sin functions are interesting. I'll try and implement some in my next work.

I didn't really notice the lerping of the eyes when I was interacting with the project. Maybe setting the interpolation value to something lower will increase the effect.

Some of the indentation is a little off but it's great that everything is labelled well.

Okay now that I can see how you made the hair, it's even more cool! I will be checking out and playing with the noise function like you have here. The extra explanation at the bottom is always appreciated!

Super well done, can't wait to see what you'll make next!