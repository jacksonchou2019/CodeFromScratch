Window Docking System - CWindowDock - Readme.txt
-------------------------------------------------
To use the docking system you simply need to include CWindowDock.h and create an object of type CWindowDock. Next set a parent window by calling CWindowDock::SetParent() and finally add child windows by calling CWindowDock::AddChild().

The docking system works by keeping track of a parent window and a list of child windows. When a window is moved the system first checks to see if the window is one it is tracking. If the window is the parent window then it will check the list of child windows and move any that are docked. If the window is a child window than it will check docking cases and dock or undock the window. To tell if windows should be docked or not the system uses a threshold number which can be changed. The threshold determines how close a child window must be to the parentwindow before it is docked.

Quick Reference
----------------
CWindowDock::SetParent(HWND)
  Sets the parent window for the docking system.

CWindowDock::SetThreshold(long)
  Sets the docking threshold.

CWindowDock::AddChild(HWND, bool)
  Adds a window to the list of child windows. If the second argument
  is true then the child window will automatically be docked if it is within
  the docking threshold.

CWindowDock::RemoveChild(HWND)
  Removes a window from the list of child windows.

CWindowDock::FindChild(HWND)
  If the specified window handle is in the list of child windows, this
  function returns a pointer to the CWDChild object. Used by the function
  CWindowDock::WindowMoved() to determine if a window handle is in the
  list of child windows and to retrieve its properties.

CWindowDock::WindowMoved(HWND)
  This is where the docking process is. If the window handle is in the list
  of child windows then this function will check for docking cases and
  dock the window. If the window handle is the parent window then this
  function will loop through the list of child windows and move all docked
  windows.



Final Note
-----------
This is my first attempt at window docking code so there are most likely some good improvements I could make.

Should you have any questions, comments or suggestions for improvement for this code then please email me at InsaneBoarder234@hotmail.com or leave a comment for the code at www.planetsourcecode.com.

Thank you very much for taking an interest in my code!