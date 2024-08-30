using System;

namespace EventHub.Models;
public class Event
{
    public int Id { get; set; }
    public string? Title { get; set; } = string.Empty;
    public DateTime Date { get; set; } = DateTime.Now;
    public string? Email { get; set; } = string.Empty;
    
}