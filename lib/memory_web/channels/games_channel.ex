defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => %{items: ["A", [], [], [], "A", []], clicks: 5}}, socket}
      # Game.client_view(game)
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("markItem", %{ "item" => ii }, socket) do
    game = Game.markItem(socket.assigns[:game], ii)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => Game.client_view(game)}}, socket}
  end

  def handle_in("flipDown", payload, socket) do
    game = Game.checkMatch(socket.assigns[:game])
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => Game.client_view(game)}}, socket}
  end

  def handle_in("reset", payload, socket) do
    game = Game.new()
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
