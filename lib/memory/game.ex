defmodule Memory.Game do

  def new do
    %{
      items: init_items(),
      clicks: 0,
    }
  end

  def init_items() do
    # make a deck??
  end

  def client_view(game) do

  end


  def markItem(game, name) do
    # flip an item up if it's been clicked
  end

  def checkMatch() do
    # check to see if there's a match also flipped
    # if there is mark them as matched
    # if not, flip them back over
  end

  def markMatched(game) do
    # mark the matched items
    # keep them flipped visibly
  end

  def flipAll(game) do
    # flip items back over (if not matched)
  end

end
