defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def player(conn, %{"player" => player}) do
    render conn, "player.html", player: player
  end
end
